"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Hex } from "./icons/hex";
import { Bolt } from "./icons/bolt";
import { PlanetIcon } from "./icons/planetIcon";
import { ProfileIcon } from "./icons/profileIcon";
import { Gear } from "./icons/gear";

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
            <Hex
              className={`${page === "main" ? "dark:text-white" : "text-gray-500"}`}
            ></Hex>
          </button>
          <button
            onClick={() => {
              updatePage("ai");
            }}
            className="p-2"
          >
            <Bolt
              className={`${page === "ai" ? "dark:text-white" : "text-gray-500"}`}
            ></Bolt>
          </button>
          <button
            onClick={() => {
              updatePage("planet");
            }}
            className="p-2"
          >
            <PlanetIcon
              className={`${page === "planet" ? "dark:text-white" : "text-gray-500"}`}
            ></PlanetIcon>
          </button>
        </div>

        <div id="preferences" className="py-4 space-y-6 flex flex-col">
          <button
            onClick={() => {
              updatePage("profile");
            }}
            className="p-2"
          >
            <ProfileIcon
              className={`${page === "profile" ? "dark:text-white" : "text-gray-500"}`}
            ></ProfileIcon>
          </button>
          <button
            onClick={() => {
              updatePage("settings");
            }}
            className="p-2"
          >
            <Gear
              className={`${page === "settings" ? "dark:text-white" : "text-gray-500"}`}
            ></Gear>
          </button>
        </div>
      </div>
    </div>
  );
}
