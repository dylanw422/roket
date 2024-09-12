export async function jobFinder(page, browser, socket) {
  socket.emit("process", "Starting job search...");
  await page.locator("[aria-label='Search']").fill("Software Engineer");
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.locator("button:has-text('Jobs')").first().click();
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.locator("[aria-label='Easy Apply filter.']").click();
  await page.waitForLoadState("domcontentloaded");

  await page.waitForTimeout(5000);

  const jobList = await page.locator("ul.scaffold-layout__list-container");
  const jobCards = await jobList.locator("li[data-occludable-job-id]");
  const jobCardCount = await jobCards.count();
  console.log("jobs cards", jobCardCount);

  for (let i = 0; i < 1; i++) {
    const jobSection = jobCards.nth(i);
    const jobSectionId = await jobSection.getAttribute(
      "data-occludable-job-id",
    );
    console.log(jobSectionId);
    const jobSectionDiv = await jobSection.locator(
      ".job-card-container--clickable",
    );
    await jobSectionDiv.click();

    // SAVE JOB DETAILS
    let jobTitle = await page.textContent(".t-24.t-bold.inline");
    let companyName = await page.textContent(
      ".job-details-jobs-unified-top-card__company-name",
    );
    let jobDetails = await page.textContent(
      ".job-details-jobs-unified-top-card__job-insight.job-details-jobs-unified-top-card__job-insight--highlight",
    );
    let jobSalaryMatch = await jobDetails.match(
      /\$[a-zA-Z0-9\s\-]+\/(yr|hr)\s*-\s*\$[a-zA-Z0-9\s\-]+\/(yr|hr)/,
    );
    let jobScheduleMatch = await jobDetails.match(
      /(Full-time|Part-time|Temporary|Contract|Internship)/,
    );
    let jobLocationMatch = await jobDetails.match(/(On-site|Remote|Hybrid)/);

    let jobSalary = jobSalaryMatch ? jobSalaryMatch[0] : "No salary provided";
    let jobSchedule = jobScheduleMatch
      ? jobScheduleMatch[0]
      : "No type provided";
    let jobLocation = jobLocationMatch
      ? jobLocationMatch[0]
      : "Location not provided";

    console.log(jobSalary, jobSchedule, jobLocation);
    // START APPLICATION: CLICK APPLY BUTTON
    let applyBtn = await page
      .locator(".jobs-apply-button.artdeco-button")
      .first();
    if (await applyBtn.isVisible()) {
      await applyBtn.click();
    } else {
      continue;
    }

    socket.emit("process", `${jobTitle} @ ${companyName.trim()}`);

    //  WHILE LOOP TO CLICK THROUGH AND FILL OUT APPLICATION FORM
    let nextStepBtn = await page.locator(
      "[aria-label='Continue to next step']",
    );
    let reviewBtn = await page.locator(
      "[aria-label='Review your application']",
    );
    let submitBtn = await page.locator("[aria-label='Submit application']");

    if (await nextStepBtn.isVisible()) {
      await nextStepBtn.click();
    }

    while ((await nextStepBtn.isVisible()) || (await reviewBtn.isVisible())) {
      const form = await page.locator("form").first();

      const textInputs = await form.locator("[type='text']").elementHandles();
      const radioInputs = await form
        .locator("label[data-test-text-selectable-option__label='Yes']")
        .elementHandles();
      const selectElements = await form
        .locator("select[data-test-text-entity-list-form-select]")
        .elementHandles();

      for (const textInput of textInputs) {
        await textInput.fill("8");
      }

      for (const radioInput of radioInputs) {
        await radioInput.click();
      }

      for (const select of selectElements) {
        await select.selectOption("Yes");
      }

      if (await nextStepBtn.isVisible()) {
        await nextStepBtn.click();
      } else {
        break;
      }
    }

    // REVIEW APPLICATION STEP
    if (await reviewBtn.isVisible()) {
      await reviewBtn.click();
    }

    // SUBMIT APPLICATION STEP
    // if (await submitBtn.isVisible()) {
    //   await submitBtn.click();
    // }
    //
    socket.emit("job", {
      title: jobTitle.trim(),
      company: companyName.trim(),
      salary: jobSalary.trim(),
      location: jobLocation.trim(),
      schedule: jobSchedule.trim(),
    });

    // CLOSE MODAL
    let closeBtn = await page.locator("[data-test-modal-close-btn]");
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }
}
