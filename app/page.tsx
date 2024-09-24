"use client";
import React, { useState, useEffect } from "react";
import Main from "@/components/main/main";
import Ai from "@/components/main/ai";
import Planet from "@/components/main/planet";
import Profile from "@/components/main/profile";
import Settings from "@/components/main/settings";
import Locked from "@/components/main/locked";
import { socket } from "@/socket";
import { useTheme } from "next-themes";
import { startTask } from "@/hooks/socketService";
import { CustomDock } from "@/components/customDock";

export default function Home() {
  const [page, setPage] = useState("main");
  const [productKeyVerified, setProductKeyVerified] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const { theme, setTheme } = useTheme();

  // SOCKET CONNECTION
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  // KEYBOARD SHORTCUTS AND THEME
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "n") {
        setTheme(theme === "dark" ? "light" : "dark");
        console.log(theme);
      }

      if (e.metaKey && e.key === "s") {
        startTask(
          localStorage.getItem("LinkedInUsername"),
          localStorage.getItem("LinkedInPassword"),
          localStorage.getItem("jobSearch"),
          localStorage.getItem("experience"),
          localStorage.getItem("salary"),
          localStorage.getItem("jobType"),
          localStorage.getItem("remote"),
          localStorage.getItem("recent"),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [theme, setTheme]);

  const renderContent = () => {
    switch (page) {
      case "main":
        return <Main setPage={setPage} />;
      case "ai":
        return <Ai />;
      case "planet":
        return <Planet />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
    }
  };

  if (!productKeyVerified) {
    return <Locked setProductKeyVerified={setProductKeyVerified} />;
  }

  return (
    <div className="w-full h-screen flex bg-neutral-100 dark:bg-gray-950 text-neutral-800 dark:text-white text-sm">
      <div className="w-full h-screen p-4">{renderContent()}</div>
      <CustomDock
        setPage={setPage}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-auto flex items-center my-4"
      />
    </div>
  );
}
