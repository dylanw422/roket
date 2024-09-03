import { chromium, devices } from "playwright";

export default async function LinkedInApply(socket, un, pw) {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 200 });
    const context = await browser.newContext(devices["Desktop Chrome"]);
    const page = await context.newPage();

    await page.goto("https://www.linkedin.com/login");
    socket.emit("running");

    setTimeout(async () => {
      await browser.close();
      socket.emit("stopped");
    }, 3000);
  } catch (err) {
    console.error("LinkedInApply Error: ", err);
    throw err;
  }
}
