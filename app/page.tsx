"use client";
import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Main from "@/components/main/main";
import Ai from "@/components/main/ai";
import Planet from "@/components/main/planet";
import Profile from "@/components/main/profile";
import Settings from "@/components/main/settings";
import Image from "next/image";
import { socket } from "@/socket";
import Locked from "@/components/main/locked";
import { useTheme } from "next-themes";
import { startTask } from "@/hooks/socketService";

export default function Home() {
  const [page, setPage] = useState("main");
  const [productKeyVerified, setProductKeyVerified] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const { theme, setTheme } = useTheme();

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "n") {
        setTheme(theme === "dark" ? "light" : "dark");
        console.log(theme);
      }

      if (e.metaKey && e.key === "s") {
        startTask(localStorage.LinkedInUsername, localStorage.LinkedInPassword);
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
        return <Main />;
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
      <Nav updatePage={setPage} page={page} resetKey={setProductKeyVerified} />
      <div className="w-full h-screen p-4">{renderContent()}</div>
    </div>
  );
}
