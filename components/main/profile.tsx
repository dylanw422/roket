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

export default function Profile() {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("LinkedInUsername") || "";
  });
  const [password, setPassword] = useState<string>(() => {
    return localStorage.getItem("LinkedInPassword") || "";
  });
  const [saved, setSaved] = useState(0);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("LinkedInUsername", username);
      localStorage.setItem("LinkedInPassword", password);
      setSaved(1);
      setTimeout(() => {
        setSaved(0);
      }, 2000);
    } catch (err) {
      console.error("error", err);
    }
  };

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-500 icon icon-tabler icons-tabler-filled icon-tabler-user w-12 h-12"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </svg>
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
        <button
          onClick={() => saveToLocalStorage()}
          className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-[#9469f5] transition duration-100 text-white"
        >
          {saved == 0 ? "Save" : "Saved"}
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
        <div className="mt-4 text-gray-600 flex flex-col rounded-xl w-full space-y-4">
          <div id="job-search" className="flex items-center justify-between">
            <h1>Job Search</h1>
            <input
              className="rounded-lg dark:bg-gray-900 border border-neutral-300 dark:border-gray-800 p-1 px-2 text-xs w-1/2 outline-none placeholder:text-gray-500"
              placeholder="Frontend Software Engineer"
            />
          </div>
          <div id="experience" className="flex items-center justify-between">
            <h1>Experience</h1>
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border-neutral-300 dark:border-gray-800 text-gray-500">
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
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-neutral-300 dark:border-gray-800 text-gray-500">
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
            <Select>
              <SelectTrigger className="w-1/2 py-1 px-2 text-xs border border-neutral-300 dark:border-gray-800 text-gray-500">
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
            <Switch />
          </div>
          <div id="recent" className="flex items-center justify-between">
            <h1>Recently Posted</h1>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
