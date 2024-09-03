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

export default function Home() {
  const [page, setPage] = useState("main");
  const [productKeyVerified, setProductKeyVerified] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

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
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-950">
        <Image width={100} height={100} alt="" src="./roketLogo2.svg" />
        <div className="flex h-8 my-12">
          <input
            className="bg-gray-900 rounded-lg border border-gray-800 py-1 px-3 outline-none placeholder:text-sm text-white"
            placeholder="PRODUCT KEY"
          />
          <button onClick={() => setProductKeyVerified(true)}>
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right w-12 p-1 text-white ml-2 rounded-lg border border-gray-800 bg-pink-500 h-full"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M15 16l4 -4" />
              <path d="M15 8l4 4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex bg-gray-950 text-white text-sm">
      <Nav updatePage={setPage} resetKey={setProductKeyVerified} />
      <div className="w-full h-screen p-4">{renderContent()}</div>
    </div>
  );
}
