// captchaSolver.js
export async function solveCaptcha(page, socket) {
  try {
    // NESTED IFRAMES TO FIND CAPTCHA
    const iframe1 = page.frameLocator("#captcha-internal");
    const iframe2 = iframe1.frameLocator("#arkoseframe");
    const iframe3 = iframe2.frameLocator(
      'iframe[data-e2e="enforcement-frame"]',
    );
    const iframe4 = iframe3.frameLocator("#fc-iframe-wrap");
    const iframe5 = iframe4.frameLocator("#CaptchaFrame");
    const iframe6 = iframe4.frameLocator("#CaptchaFrame2");

    let verifyBtn = iframe5.locator("#home_children_button");

    // Wait for the verify button to be visible
    await verifyBtn.waitFor({
      state: "visible",
      timeout: 10000,
    });

    // Click to start CAPTCHA solving
    await page.waitForTimeout(500);
    await verifyBtn.click();

    // START CAPTCHA SOLVE PROCESS
    let captchaSolved = false;
    let activeFrame = iframe5;
    let firstPass = true;
    const timeout = 60000; // 60 seconds timeout for CAPTCHA solving
    const startTime = Date.now();

    while (!captchaSolved) {
      // Intercept network requests for CAPTCHA solving
      const responsePromise = page.waitForResponse(
        (response) =>
          response.url().includes("client-api.arkoselabs.com/fc/ca/") &&
          response.status() === 200,
      );

      // Check if the timeout has been reached
      if (Date.now() - startTime > timeout) {
        console.error("Timeout reached while solving CAPTCHA.");
        socket.emit("error", "Timeout reached while solving CAPTCHA.");
        return;
      }

      let gameboard = activeFrame.locator("#game");

      if (!firstPass) {
        await page.waitForTimeout(2000);
      }

      // Capture and process the screenshot
      const screenshot = await gameboard.screenshot();
      const screenshotb64 = screenshot.toString("base64");
      socket.emit("screenshot", screenshotb64);
      socket.emit("process", "Solve the Captcha!");

      // Await captcha answer from socket
      const captchaAnswer = await new Promise((resolve) => {
        socket.once("captchaAnswer", resolve);
      });

      let selection;
      if (captchaAnswer === 1) {
        selection = activeFrame.locator(
          `a[aria-label="Visual challenge. Audio challenge is available below. Compatible with screen reader software. Image ${captchaAnswer}. "]`,
        );
      } else {
        selection = activeFrame.locator(
          `a[aria-label="Image ${captchaAnswer}."]`,
        );
      }

      await selection.click();

      // Wait for CAPTCHA response
      const response = await responsePromise;
      const responseBody = await response.json();

      if (responseBody.solved === true) {
        captchaSolved = true;
        socket.emit("process", "Captcha Solved!");
      } else if (
        responseBody.solved === false &&
        responseBody.response === "answered"
      ) {
        console.log("needs to click Try Again btn.");
        const tryAgainBtn = activeFrame.locator("#wrong_children_button");
        await tryAgainBtn.waitFor({
          state: "visible",
          timeout: 5000,
        });
        await tryAgainBtn.click();
        activeFrame = activeFrame == iframe5 ? iframe6 : iframe5;
      }

      firstPass = false;
    }

    socket.emit("process", "Captcha Solved!");
  } catch (err) {
    console.error("Captcha solving error: ", err);
    socket.emit("error", "Error during CAPTCHA solving.");
    throw err;
  }
}
