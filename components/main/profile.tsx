"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { ProfileIcon } from "../icons/profileIcon";
import useProfileData from "@/hooks/profileData";

export default function Profile() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    jobSearch,
    setJobSearch,
    experience,
    setExperience,
    salary,
    setSalary,
    jobType,
    setJobType,
    remote,
    setRemote,
    recent,
    setRecent,
    saved,
    saveToLocalStorage,
  } = useProfileData();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveToLocalStorage();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div id="header" className="flex justify-between items-start w-full">
        <div id="profile" className="flex w-1/3">
          <div
            id="profile-icon"
            className="w-24 h-24 rounded-lg border border-neutral-300 dark:border-gray-800 dark:bg-gray-900 flex justify-center items-center mr-4"
          >
            <ProfileIcon className="scale-150 text-gray-500" />
          </div>
          <div id="un-pw" className="flex flex-col flex-1 space-y-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded-lg border border-neutral-300 dark:border-gray-800 dark:bg-gray-900 w-full outline-none"
              placeholder="LinkedIn Email"
              value={username}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
              className="p-2 rounded-lg border border-neutral-300 dark:border-gray-800 dark:bg-gray-900 w-full outline-none"
              placeholder="LinkedIn Password"
              value={password}
            />
          </div>
        </div>
        <button onClick={() => saveToLocalStorage()}>
          <AnimatedGradientText className="h-full rounded-lg">
            <span
              className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-secondary-foreground/80`}
            >
              {saved == 0 ? "Save" : "Saved"}
            </span>
          </AnimatedGradientText>
        </button>
      </div>
      <p className="py-4 text-gray-500 border-b border-neutral-300 dark:border-gray-900">
        Please note that your LinkedIn login credentials are required to allow
        the bot to access your LinkedIn account. Rest assured, we do not store
        or save your credentials on our servers. Your login information is saved
        locally on your device solely for the purpose of running the bot. Once
        the process is complete, you can safely remove the credentials from your
        device. By proceeding and using this application, you acknowledge that
        you understand and agree to these terms.
      </p>
      <div className="w-full flex h-full">
        <div className="mt-4 flex flex-col rounded-xl w-full space-y-4">
          <div id="job-search" className="flex items-center justify-between">
            <h1>Job Search</h1>
            <input
              onChange={(e) => setJobSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={jobSearch}
              className="rounded-lg dark:bg-gray-900 border border-neutral-300 dark:border-gray-800 py-2 px-2 text-xs w-1/2 outline-none placeholder:text-gray-500 text-gray-700 dark:text-neutral-300"
              placeholder="Frontend Software Engineer"
            />
          </div>
          <div id="experience" className="flex items-center justify-between">
            <h1>Experience</h1>
            <Select
              onValueChange={(value) => setExperience(value)}
              defaultValue={experience}
            >
              <SelectTrigger className="w-1/2 px-2 text-xs border-neutral-300 dark:border-gray-800">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="entrylevel">Entry Level</SelectItem>
                <SelectItem value="associate">Associate</SelectItem>
                <SelectItem value="midsenior">Mid-Senior Level</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div id="salary" className="flex items-center justify-between">
            <h1>Salary Requirements</h1>
            <Select
              onValueChange={(value) => setSalary(value)}
              defaultValue={salary}
            >
              <SelectTrigger className="w-1/2 px-2 text-xs border border-neutral-300 dark:border-gray-800">
                <SelectValue placeholder="Salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">$60,000+</SelectItem>
                <SelectItem value="80">$80,000+</SelectItem>
                <SelectItem value="100">$100,000+</SelectItem>
                <SelectItem value="120">$120,000+</SelectItem>
                <SelectItem value="140">$140,000+</SelectItem>
                <SelectItem value="160">$160,000+</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div id="job-type" className="flex items-center justify-between">
            <h1>Job Type</h1>
            <Select
              onValueChange={(value) => setJobType(value)}
              defaultValue={jobType}
            >
              <SelectTrigger className="w-1/2 px-2 text-xs border border-neutral-300 dark:border-gray-800">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full-Time</SelectItem>
                <SelectItem value="part">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temp">Temporary</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="intern">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div id="remote-only" className="flex items-center justify-between">
            <h1>Remote Only</h1>
            <Switch
              onCheckedChange={(bool) => setRemote(bool ? "true" : "false")}
              defaultChecked={remote === "true" ? true : false}
            />
          </div>
          <div id="recent" className="flex items-center justify-between">
            <h1>Recently Posted</h1>
            <Switch
              onCheckedChange={(bool) => setRecent(bool ? "true" : "false")}
              defaultChecked={recent === "true" ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
