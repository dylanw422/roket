import { chromium, devices } from "playwright";
import { solveCaptcha } from "./captchaSolver.mjs";
import { jobFinder } from "./jobFinder.mjs";

export default async function LinkedInApply(
  socket,
  un,
  pw,
  jobSearch,
  experience,
  salary,
  type,
  remote,
  recent,
) {
  try {
    // BROWSER START
    const browser = await chromium.launch({
      headless: false,
      slowMo: 500,
    });
    const context = await browser.newContext(devices["Desktop Chrome"]);
    const page = await context.newPage();
    socket.emit("running");

    // GO TO LINKEDIN & LOGIN
    await page.goto("https://www.linkedin.com/login");
    socket.emit("process", "Logging in...");
    await page.locator("#username").fill(un);
    await page.locator("#password").fill(pw);
    const submit = await page.$(".btn__primary--large.from__button--floating");
    await submit.click();
    socket.emit("process", "Login Successful.");

    // CHECK IF REDIRECTED TO CAPTCHA
    const captchaRedirected = page.url().includes("/checkpoint/challenge");
    if (captchaRedirected) {
      socket.emit("process", "Preparing Captcha...");
      await solveCaptcha(page, browser, socket);
    }

    // PROCEED WITH JOB APPLICATION
    await jobFinder(
      page,
      browser,
      socket,
      jobSearch,
      experience,
      salary,
      type,
      remote,
      recent,
    );

    // Optionally close browser after a delay
    setTimeout(async () => {
      await browser.close();
      socket.emit("stopped");
    }, 3000);
  } catch (err) {
    console.error("LinkedInApply Error: ", err);
    socket.emit("stopped");
    throw err;
  }
}
