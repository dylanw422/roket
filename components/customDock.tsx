import React from "react";
import Link from "next/link";
import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { useTheme } from "next-themes";
import { Home } from "./icons/home";
import { Bolt } from "./icons/bolt";
import { PlanetIcon } from "./icons/planetIcon";
import { Moon } from "./icons/moon";
import { Sun } from "./icons/sun";
import { ProfileIcon } from "./icons/profileIcon";
import { Gear } from "./icons/gear";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function CustomDock({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { theme, setTheme } = useTheme();
  const ICONS = {
    home: <Home />,
    ai: <Bolt />,
    planet: <PlanetIcon />,
    profile: <ProfileIcon />,
    settings: <Gear />,
  };

  const DATA = {
    navbar: [
      {
        name: "home",
        icon: ICONS.home,
      },
      {
        name: "ai",
        icon: ICONS.ai,
      },
      {
        name: "planet",
        icon: ICONS.planet,
      },
    ],
    settings: [
      {
        name: "profile",
        icon: ICONS.profile,
      },
      {
        name: "settings",
        icon: ICONS.settings,
      },
    ],
    contact: ["x", "insta", "tiktok"],
    modeToggle: {
      icon: theme === "dark" ? <Moon /> : <Sun />,
    },
  };

  return (
    <div className={className}>
      <Dock direction="middle">
        {DATA.navbar.map((item, index) => (
          <DockIcon key={index}>{item.icon}</DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {DATA.settings.map((item, index) => (
          <DockIcon key={index}>{item.icon}</DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {DATA.modeToggle.icon}
        </DockIcon>
      </Dock>
    </div>
  );
}
