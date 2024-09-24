import { insertJob } from "../database/queries.mjs";

export async function jobFinder(
  page,
  browser,
  socket,
  jobSearch,
  experience,
  salary,
  type,
  remote,
  recent,
) {
  socket.emit("process", "Starting job search...");
  await page.locator("[aria-label='Search']").fill(jobSearch);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.locator("button:has-text('Jobs')").first().click();
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await page.locator("button[aria-label='Easy Apply filter.']").click();
  await page.waitForLoadState("domcontentloaded");

  await page.waitForTimeout(2500);
  socket.emit("process", "Filtering for user preferences...");

  if (recent && recent === "true") {
    await page
      .locator(
        "button[aria-label='Date posted filter. Clicking this button displays all Date posted filter options.']",
      )
      .click();
    await page.locator("span:has-text('Past week')").first().click();
    await page
      .locator("button[aria-label^='Apply current filter to show']")
      .first()
      .click();
  }

  await page.waitForTimeout(1000);
  if (experience && experience !== "any") {
    await page
      .locator(
        "button[aria-label='Experience level filter. Clicking this button displays all Experience level filter options.']",
      )
      .click();
    if (experience === "internship") {
      await page.locator("label[for='experience-1']").click();
    } else if (experience === "entrylevel") {
      await page.locator("label[for='experience-2']").click();
    } else if (experience === "associate") {
      await page.locator("label[for='experience-3']").click();
    } else if (experience === "midsenior") {
      await page.locator("label[for='experience-4']").click();
    } else if (experience === "director") {
      await page.locator("label[for='experience-5']").click();
    } else {
      await page.locator("label[for='experience-6']").click();
    }

    await page
      .locator("button[aria-label^='Apply current filter to show']")
      .nth(1)
      .click();
  }

  await page.waitForTimeout(1000);
  if (salary && salary !== "none") {
    await page
      .locator(
        "button[aria-label='Salary filter. Clicking this button displays all Salary filter options.']",
      )
      .click();
    if (salary === "60") {
      await page.locator("label[for='salaryBucketV2-2']").click();
    } else if (salary === "80") {
      await page.locator("label[for='salaryBucketV2-3']").click();
    } else if (salary === "100") {
      await page.locator("label[for='salaryBucketV2-4']").click();
    } else if (salary === "120") {
      await page.locator("label[for='salaryBucketV2-5']").click();
    } else if (salary === "140") {
      await page.locator("label[for='salaryBucketV2-6']").click();
    } else if (salary === "160") {
      await page.locator("label[for='salaryBucketV2-7']").click();
    }

    await page
      .locator("button[aria-label^='Apply current filter to show']")
      .nth(2)
      .click();
  }

  await page.waitForTimeout(1000);
  if (remote && remote === "true") {
    await page
      .locator(
        "button[aria-label='Remote filter. Clicking this button displays all Remote filter options.']",
      )
      .click();
    await page.locator("label[for='workplaceType-2']").click();
    await page
      .locator("button[aria-label^='Apply current filter to show']")
      .nth(4)
      .click();
  }

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
      /\$[a-zA-Z0-9\s\-]+\/(yr|hr)(\s*-\s*\$[a-zA-Z0-9\s\-]+\/(yr|hr))?/,
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
    let jobLinkUrl = page.url();
    let jobLinkObj = new URL(jobLinkUrl);
    let jobId = jobLinkObj.searchParams.get("currentJobId");
    let jobLink = `https://www.linkedin.com/jobs/view/${jobId}`;

    console.log(jobSalary, jobSchedule, jobLocation, jobLink);

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
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }

    let job = {
      title: jobTitle.trim(),
      company: companyName.trim(),
      salary: jobSalary.trim(),
      location: jobLocation.trim(),
      schedule: jobSchedule.trim(),
      timestamp: new Date().toLocaleDateString("en-US"),
      pinned: 0,
      link: jobLink,
    };

    socket.emit("job", job);
    insertJob(job);
    console.log("Job inserted into db.");

    // CLOSE MODAL
    let closeBtn = await page.locator("[data-test-modal-close-btn]");
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }

    await page.waitForTimeout(2000);

    // CLOSE SENT MODAL
    closeBtn = await page.locator("[aria-label='Dismiss']").first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }
}
