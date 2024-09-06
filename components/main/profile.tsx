"use client";
import React, { useState } from "react";

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
            className="w-24 h-24 rounded-lg border border-gray-800 bg-gray-900 flex justify-center items-center mr-4"
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
              className="p-2 rounded-lg border border-gray-800 bg-gray-900 w-full outline-none"
              placeholder="LinkedIn Email"
              value={username}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              type="password"
              className="p-2 rounded-lg border border-gray-800 bg-gray-900 w-full outline-none"
              placeholder="LinkedIn Password"
              value={password}
            />
          </div>
        </div>
        <button
          onClick={() => saveToLocalStorage()}
          className="px-4 py-2 rounded-lg bg-violet-500"
        >
          {saved == 0 ? "Save" : "Saved"}
        </button>
      </div>
      <p className="mt-4 text-gray-500">
        Please note that your LinkedIn login credentials are required to allow
        the bot to access your LinkedIn account. Rest assured, we do not store
        or save your credentials on our servers. Your login information is saved
        locally on your device solely for the purpose of running the bot. Once
        the process is complete, you can safely remove the credentials from your
        device. By proceeding and using this application, you acknowledge that
        you understand and agree to these terms.
      </p>
    </div>
  );
}
