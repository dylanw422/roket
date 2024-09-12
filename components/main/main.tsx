"use client";
import React, { useState, useEffect } from "react";
import { socket } from "@/socket";
import { Spinner } from "../ui/spinner";

interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  schedule: string;
  status: string;
}

export default function Main() {
  const [status, setStatus] = useState("Start Task");
  const [process, setProcess] = useState("Starting service...");
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);
  const [captchaProcess, setCaptchaProcess] = useState<number>(0);
  const [rowsFromSocket, setRowsFromSocket] = useState<Job[]>([]);
  const [rowsFromDb, setRowsFromDb] = useState<Job[]>([]);

  const startTask = () => {
    socket.emit(
      "servicestart",
      localStorage.getItem("LinkedInUsername"),
      localStorage.getItem("LinkedInPassword"),
    );
  };

  const captchaAnswer = (ans: number) => {
    socket.emit("captchaAnswer", ans);
    setCaptchaImg(null);
  };

  socket.on("running", () => {
    setStatus("Running...");
  });

  socket.on("stopped", () => {
    setStatus("Start Task");
  });

  socket.on("process", (msg) => {
    setProcess(msg);
    if (msg === "Preparing Captcha...") {
      setCaptchaProcess(1);
    }

    if (msg === "Captcha Solved!") {
      setCaptchaProcess(2);
    }
  });

  socket.on("screenshot", (b64) => {
    setCaptchaImg(b64);
  });

  socket.on("error", () => {
    setStatus("Start Task");
    setCaptchaImg(null);
    setCaptchaProcess(0);
  });

  useEffect(() => {
    socket.on("job", (obj) => {
      setRowsFromSocket((prevState) => [obj, ...prevState]);
    });

    return () => {
      socket.off("job");
    };
  }, []);

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
                      onClick={() => captchaAnswer(squareNumber)}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}
      {status == "Running..." ? (
        <div className="absolute bottom-0 right-0 z-10 m-4 w-1/4 bg-white dark:bg-gray-900 rounded-lg border border-neutral-300 dark:border-gray-800 p-4 animate-slideIn shadow-black/20 dark:shadow-black shadow-md">
          <p className="dark:text-gray-300">
            {process.includes("@") ? "Applying To:" : "Status:"}
          </p>
          <p className="text-xs text-neutral-500 dark:text-gray-400 pt-2">
            {process}
          </p>
        </div>
      ) : null}
      <h1 className="text-2xl">Tasks</h1>
      <div id="info" className="mt-4 flex justify-between">
        <div className="flex space-x-4">
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            1239 Tasks
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            824 Success
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-neutral-200 dark:border-gray-800">
            415 Fails
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              startTask();
            }}
            className="px-4 py-2 rounded-lg border-t border-white dark:border-gray-700 bg-neutral-50 dark:bg-gray-900 flex items-center shadow-neutral-300 shadow-md dark:shadow-black dark:shadow-md hover:bg-white dark:hover:bg-gray-800 transition duration-300"
          >
            {status == "Running..." ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 mr-2 text-red-500 icon icon-tabler icons-tabler-filled icon-tabler-player-stop"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 mr-2 text-green-400 icon icon-tabler icons-tabler-filled icon-tabler-player-play"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
              </svg>
            )}
            <p>{status}</p>
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
              <th className="font-normal">Status</th>
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
              <td>{job.status}</td>
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
