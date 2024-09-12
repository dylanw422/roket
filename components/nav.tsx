"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Nav({ updatePage, page, resetKey }: any) {
  return (
    <div className="w-16 h-full flex flex-col items-center border-r border-neutral-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <Image
        onClick={() => resetKey(false)}
        className="m-4"
        width={40}
        height={40}
        alt=""
        src="./roketLogo.svg"
      />
      <div id="buttons" className="h-full flex flex-col justify-between">
        <div id="navigation" className="space-y-6 py-4 flex flex-col ">
          <button
            onClick={() => {
              updatePage("main");
            }}
            className="p-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`icon icon-tabler icons-tabler-filled icon-tabler-assembly w-6 h-6 ${page === "main" ? "dark:text-white" : "text-gray-500"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13.666 1.429l6.75 3.98q .1 .06 .18 .133l.009 .008l.106 .075a3.22 3.22 0 0 1 1.284 2.39l.005 .203v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.23 3.23 0 0 1 -1.678 -2.826v-7.285a3.21 3.21 0 0 1 1.65 -2.808l6.775 -3.995a3.34 3.34 0 0 1 3.24 .015m-.64 5.343a2.03 2.03 0 0 0 -2 -.014l-3.023 1.804a1.99 1.99 0 0 0 -1.002 1.736v3.278a2 2 0 0 0 1.03 1.75l2.946 1.89c.657 .367 1.39 .367 1.994 .033l3.054 -1.955c.582 -.322 .976 -.992 .976 -1.719v-3.277l-.005 -.164a2 2 0 0 0 -.725 -1.391l-.092 -.07l-.056 -.047a1 1 0 0 0 -.096 -.064z" />
            </svg>
          </button>
          <button
            onClick={() => {
              updatePage("ai");
            }}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={`icon icon-tabler icons-tabler-outline icon-tabler-bolt w-6 h-6 ${page === "ai" ? "dark:text-white" : "text-gray-500"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
            </svg>
          </button>
          <button
            onClick={() => {
              updatePage("planet");
            }}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={`icon icon-tabler icons-tabler-outline icon-tabler-planet w-6 h-6 ${page === "planet" ? "dark:text-white" : "text-gray-500"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
              <path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>
          </button>
        </div>

        <div id="preferences" className="py-4 space-y-6 flex flex-col">
          <button
            onClick={() => {
              updatePage("profile");
            }}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`icon icon-tabler icons-tabler-filled icon-tabler-user w-6 h-6 ${page === "profile" ? "dark:text-white" : "text-gray-500"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </svg>
          </button>
          <button
            onClick={() => {
              updatePage("settings");
            }}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className={`icon icon-tabler icons-tabler-outline icon-tabler-settings w-6 h-6 ${page === "settings" ? "dark:text-white" : "text-gray-500"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
