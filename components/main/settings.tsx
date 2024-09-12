"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export default function Settings() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Check the platform
    const platform = window.navigator.platform.toLowerCase();
    if (platform.includes("mac")) {
      setIsMac(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-1/3 h-full border border-neutral-300 dark:border-gray-800 rounded-lg p-4 shadow-black/10 dark:shadow-black shadow-md">
        <h1 className="text-2xl">Keyboard Shortcuts</h1>
        <div className="flex justify-between items-center mt-4 text-gray-600 dark:text-gray-400">
          <p>Toggle Night Mode</p>
          <p className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-md">
            {isMac ? "⌘ N" : "Win N"}
          </p>
        </div>
      </div>
    </div>
  );
}
