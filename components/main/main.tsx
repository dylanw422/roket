"use client";
import React, { useState } from "react";

export default function Main() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl">Jobs</h1>
      <div id="info" className="mt-4 flex justify-between">
        <div className="flex">
          <h1 className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
            1239 Tasks
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 mx-4">
            824 Success
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
            415 Fails
          </h1>
        </div>
        <div className="flex">
          <button className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 flex items-center mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 mr-4 text-green-400 icon icon-tabler icons-tabler-filled icon-tabler-player-play"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
            </svg>
            <p>Start Task</p>
          </button>
          <input
            className="rounded-lg border border-gray-800 bg-gray-900 px-4 outline-none"
            placeholder="Filter Task"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <table className="mt-6 w-full">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500">
              <th className="py-2 font-normal">Company</th>
              <th className="font-normal">Job Type</th>
              <th className="font-normal">Experience</th>
              <th className="font-normal">Remote</th>
              <th className="font-normal w-1/3">Status</th>
            </tr>
          </thead>
        </table>
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-gray-500">No tasks to display.</h1>
        </div>
      </div>
    </div>
  );
}
