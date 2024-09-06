import { chromium, devices } from "playwright";
import { solveCaptcha } from "./captchaSolver.mjs";

export default async function LinkedInApply(socket, un, pw) {
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

    // MAYBE REDIRECTED TO SOLVE CAPTCHA
    await page.waitForURL(
      /https:\/\/www\.linkedin\.com\/checkpoint\/challenge\/.*/,
    );
    socket.emit("process", "Preparing Captcha...");

    await solveCaptcha(page, socket);

    // CONTINUE WITH JOB SEARCH
    // socket.emit("process", "Searching for jobs...");
    // await page
    //   .locator(".search-global-typeahead__input ")
    //   .fill("Software Engineer");
    //
    // await page.keyboard.press("Enter");
    //
    // await page
    //   .locator("button.artdeco-pill.search-reusables__filter-pill-button")
    //   .nth(0)
    //   .click();
    //
    // setTimeout(async () => {
    //   await browser.close();
    //   socket.emit("stopped");
    // }, 3000);
  } catch (err) {
    console.error("LinkedInApply Error: ", err);
    socket.emit("stopped");
    throw err;
  }
}
