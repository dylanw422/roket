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
import { Shortcut } from "../ui/shortcut";

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
        <h1 className="text-xl font-bold">Keyboard Shortcuts</h1>
        <Shortcut isMac={isMac} func={"Toggle Night Mode"} shortcut={"N"} />
        <Shortcut isMac={isMac} func={"Start Service"} shortcut={"S"} />
      </div>
    </div>
  );
}
