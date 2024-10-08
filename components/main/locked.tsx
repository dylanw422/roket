"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "../icons/arrowRight";
import axios from "axios";

export default function Locked({
  setProductKeyVerified,
}: {
  setProductKeyVerified: Function;
}) {
  const [productKey, setProductKey] = useState("");
  const [error, setError] = useState<string | null>();
  const [isVisible, setIsVisible] = useState(true);

  const verifyKey = async () => {
    const response = await axios.post("/api/verifyKey", { key: productKey });
    localStorage.setItem("productKey", productKey);
    if (response.data.success) {
      setProductKeyVerified(true);
    } else {
      setError(response.data.error);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-neutral-100 dark:bg-gray-950">
      <Image width={100} height={100} alt="" src="./Rocket Gradient.svg" />
      <div className="flex h-8 my-12">
        <input
          onChange={(e) => setProductKey(e.target.value)}
          className="bg-neutral-200 dark:bg-gray-900 border border-neutral-300 dark:border-gray-800 rounded-lg py-1 px-3 outline-none placeholder:text-sm text-gray-800 dark:text-neutral-200"
          placeholder="PRODUCT KEY"
        />
        <button onClick={() => verifyKey()}>
          <ArrowRight />
        </button>
        {error && (
          <div
            className={`absolute bottom-0 right-0 m-4 w-1/5 text-sm dark:bg-gray-900 shadow-md shadow-black border border-red-400 p-3 rounded-sm ${isVisible ? "animate-slideIn" : "animate-slideOut"}`}
          >
            <h1 className="font-bold">Error</h1>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
