import { Job } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { invoke } from "@tauri-apps/api/tauri";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToYearlySalary = (salary: any) => {
  if (salary.toLowerCase() === "no salary provided") {
    return null; // Ignore if no salary is provided
  }

  // Regex patterns for different salary formats
  const hourlyPattern = /\$([\d,.]+)\/hr/;
  const yearlyPattern = /\$([\d,.]+)K\/yr/;
  const hourlyRangePattern = /\$([\d,.]+)\/hr - \$([\d,.]+)\/hr/;
  const yearlyRangePattern = /\$([\d,.]+)K\/yr - \$([\d,.]+)K\/yr/;

  const hoursPerWeek = 40;
  const weeksPerYear = 52;

  // Handle hourly range
  if (hourlyRangePattern.test(salary)) {
    const match = salary.match(hourlyRangePattern);
    const minHourly = parseFloat(match[1].replace(/,/g, ""));
    const maxHourly = parseFloat(match[2].replace(/,/g, ""));
    return ((minHourly + maxHourly) / 2) * hoursPerWeek * weeksPerYear;
  }

  // Handle hourly single rate
  if (hourlyPattern.test(salary)) {
    const match = salary.match(hourlyPattern);
    const hourlyRate = parseFloat(match[1].replace(/,/g, ""));
    return hourlyRate * hoursPerWeek * weeksPerYear;
  }

  // Handle yearly range
  if (yearlyRangePattern.test(salary)) {
    const match = salary.match(yearlyRangePattern);
    const minYearly = parseFloat(match[1].replace(/,/g, "")) * 1000;
    const maxYearly = parseFloat(match[2].replace(/,/g, "")) * 1000;
    return (minYearly + maxYearly) / 2;
  }

  // Handle yearly single rate
  if (yearlyPattern.test(salary)) {
    const match = salary.match(yearlyPattern);
    return parseFloat(match[1].replace(/,/g, "")) * 1000;
  }

  return null; // Return null for unrecognized formats
};

export const findMostFrequentLocation = (jobs: Array<Job>) => {
  const locationCount = jobs.reduce((acc: any, job: Job) => {
    const location = job.location;
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  // Find the location with the highest count
  let mostFrequentLocation = null;
  let maxCount = 0;

  for (const [location, count] of Object.entries(locationCount)) {
    if ((count as any) > maxCount) {
      mostFrequentLocation = location;
      (maxCount as any) = count;
    }
  }

  return mostFrequentLocation;
};

export const openLinkInBrowser = async (url: string) => {
  try {
    await invoke("open_in_browser", { url });
  } catch (err) {
    console.error("Failed to open URL:", err);
  }
};
