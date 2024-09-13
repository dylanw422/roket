"use client";
import React, { useState } from "react";
import { Spinner } from "../ui/spinner";
import {
  useSocketListeners,
  startTask,
  captchaAnswer,
} from "@/hooks/socketService";
import { Pin } from "../icons/pin";
import { Job } from "@/types/types";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { BorderBeam } from "../magicui/border-beam";

export default function Main() {
  const [rowsFromDb, setRowsFromDb] = useState<Job[]>([]);
  const { status, process, captchaImg, captchaProcess, rowsFromSocket } =
    useSocketListeners();

  const handleStartTask = () => {
    startTask(
      localStorage.getItem("LinkedInUsername"),
      localStorage.getItem("LinkedInPassword"),
    );
  };

  const handleCaptchaAnswer = (ans: number) => {
    captchaAnswer(ans);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {captchaProcess == 1 ? (
        <div
          className="absolute top-0 left-0 z-10 flex flex-col justify-center items-center
          w-full h-full bg-gray-950 bg-opacity-50 backdrop-blur-sm animate-appear"
        >
          {captchaProcess == 1 && captchaImg == null ? (
            <Spinner className="text-white" />
          ) : (
            <div className="relative">
              <img
                className="scale-125"
                src={`data:image/png;base64,${captchaImg}`}
                alt="Captcha"
              />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 pb-3 pt-9 scale-125">
                {[1, 2, 3, 4, 5, 6].map((squareNumber) => {
                  return (
                    <div
                      key={squareNumber}
                      className="bg-transparent hover:bg-black/20 cursor-pointer text-black"
                      onClick={() => handleCaptchaAnswer(squareNumber)}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}
      {status == "Running..." ? (
        <div className="absolute bottom-0 right-0 z-10 m-4 w-1/4 bg-white dark:bg-gray-900 rounded-lg border border-neutral-300 dark:border-gray-800 p-0 animate-slideIn shadow-black/20 dark:shadow-black shadow-md">
          <div className="relative w-full h-full rounded-lg p-4">
            <p className="dark:text-gray-300">
              {process.includes("@") ? "Applying To:" : "Status:"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-gray-400 pt-2">
              {process}
            </p>
            <BorderBeam size={100} duration={5} />
          </div>
        </div>
      ) : null}
      <h1 className="text-2xl font-medium">Application Board</h1>
      <div id="info" className="mt-4 flex justify-between">
        <div className="flex space-x-4">
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            1239 Tasks
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            824 Success
          </h1>
          <h1 className="relative px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            415 Fails
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              handleStartTask();
            }}
          >
            <AnimatedGradientText className="h-full rounded-lg">
              <span
                className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
              >
                {status}
              </span>
            </AnimatedGradientText>
          </button>
          <input
            className="rounded-lg border dark:border-gray-800 dark:bg-gray-900 px-4 outline-none h-full"
            placeholder="Filter Tasks"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-8 text-xs overflow-y-scroll">
        <table className="table-fixed w-full">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-gray-800 text-gray-500">
              <th className="font-normal py-2">Position</th>
              <th className="font-normal">Company</th>
              <th className="font-normal">Job Type</th>
              <th className="font-normal">Salary</th>
              <th className="font-normal">Remote</th>
              <th className="font-normal">Date Applied</th>
              <th className="font-normal w-12"></th>
            </tr>
          </thead>
          {rowsFromSocket.map((job, index) => (
            <tr
              className="text-center border-b border-neutral-300 dark:border-gray-900"
              key={index}
            >
              <td className="py-4">{job.title}</td>
              <td>{job.company}</td>
              <td>{job.schedule}</td>
              <td>{job.salary}</td>
              <td>{job.location}</td>
              <td>{new Date(job.timestamp).toLocaleDateString("en-US")}</td>
              <td>
                <button>
                  <Pin className="text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
          {rowsFromDb.map((job, index) => (
            <tr key={index}></tr>
          ))}
        </table>
        {rowsFromSocket.length === 0 && rowsFromDb.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-gray-500">No tasks to display.</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
}
