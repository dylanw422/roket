"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "../icons/arrowRight";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Locked({
  setProductKeyVerified,
}: {
  setProductKeyVerified: Function;
}) {
  const [productKey, setProductKey] = useState("");
  const [error, setError] = useState<string | null>();
  const { toast } = useToast();

  const verifyKey = async () => {
    const response = await axios.post("/api/verifyKey", { key: productKey });
    if (response.data.success) {
      setProductKeyVerified(true);
    } else {
      console.log(response.data.error);
      setError(response.data.error);
      setTimeout(() => {
        setError(null);
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
            className={`text-white absolute bottom-0 right-0 m-4 w-1/5 text-sm bg-red-500 p-3 rounded-sm`}
          >
            <h1 className="font-bold">Error</h1>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
