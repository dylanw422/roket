"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import {
  useSocketListeners,
  startTask,
  captchaAnswer,
} from "@/hooks/socketService";
import { Pin } from "../icons/pin";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { BorderBeam } from "../magicui/border-beam";
import { Job } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllJobs, pinningFn } from "@/lib/queryFunctions";
import { convertToYearlySalary, findMostFrequentLocation } from "@/lib/utils";
import { Link } from "lucide-react";
import { openLinkInBrowser, createCsv } from "@/lib/utils";
import useProfileData from "@/hooks/profileData";

export default function Main({ setPage }: any) {
  const [pinned, setPinned] = useState<Job[]>([]);
  const [jobsFromDb, setJobsFromDb] = useState<Job[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<string>("");
  const { status, process, captchaImg, captchaProcess, rowsFromSocket } =
    useSocketListeners();
  const { username, password, jobSearch } = useProfileData();

  // Handle pin/unpin operations
  const pinningMutation = useMutation({ mutationFn: pinningFn });

  const pin = async (job: Job) => {
    pinningMutation.mutate(job.id);

    setJobsFromDb((prevState) =>
      prevState.filter((item) => item.id !== job.id),
    );
    setPinned((prevState) => [...prevState, job]);
  };

  const unpin = async (job: Job) => {
    pinningMutation.mutate(job.id);

    setPinned((prevState) => prevState.filter((item) => item.id !== job.id));
    setJobsFromDb((prevState) => [job, ...prevState]);
  };

  // USE HOOKS
  const handleStartTask = () => {
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
  };

  const handleCaptchaAnswer = (ans: number) => {
    captchaAnswer(ans);
  };

  // DB QUERY
  const { data } = useQuery({ queryKey: ["jobs"], queryFn: getAllJobs });

  useEffect(() => {
    setJobsFromDb(data?.slice(0, 500).filter((job: Job) => job.pinned === 0));
    setPinned(data?.filter((job: Job) => job.pinned === 1));
  }, [data]);

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Application Board</h1>
        <button
          onClick={async () => await createCsv(jobsFromDb ? jobsFromDb : [])}
          className="text-xs border px-2 py-1 rounded-md bg-neutral-200 dark:bg-gray-950 text-neutral-500 hover:bg-neutral-200/80"
        >
          Download CSV
        </button>
      </div>
      <div id="info" className="mt-4 flex justify-between">
        <div className="flex space-x-4">
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-purple-400 text-purple-500">
            {data?.length + rowsFromSocket.length} Applications
          </h1>
          <h1 className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-pink-400 text-pink-500">
            $
            {Math.round(
              data
                ?.map((job: Job) => convertToYearlySalary(job.salary))
                .filter((salary: string) => salary !== null)
                .reduce((sum: number, salary: number) => sum + salary, 0) /
                data?.length,
            ).toLocaleString()}
          </h1>
          <h1 className="relative px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-orange-400 text-orange-500">
            {findMostFrequentLocation(data ? data : [])}
          </h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              username && password && jobSearch
                ? status === "Running..."
                  ? null
                  : handleStartTask()
                : setPage("profile");
            }}
          >
            <AnimatedGradientText className="h-full rounded-lg">
              <span
                className={`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
              >
                {username && password && jobSearch ? status : "Set Preferences"}
              </span>
            </AnimatedGradientText>
          </button>
          <input
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="rounded-lg border dark:border-gray-800 dark:bg-gray-900 px-4 outline-none h-full"
            placeholder="Filter Tasks"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-8 pb-12 text-xs overflow-y-scroll">
        <table className="table-fixed w-full">
          <thead className="sticky top-0 bg-neutral-100 dark:bg-gray-950">
            <tr className="border-b border-neutral-300 dark:border-gray-800 text-gray-500">
              <th className="font-normal py-2">Position</th>
              <th className="font-normal">Company</th>
              <th className="font-normal">Job Type</th>
              <th className="font-normal">Salary</th>
              <th className="font-normal">Location</th>
              <th className="font-normal">Date Applied</th>
              <th className="font-normal w-12"></th>
            </tr>
          </thead>
          {pinned
            ?.filter((job: Job) =>
              Object.values(job).some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(filterCriteria.toLowerCase()),
              ),
            )
            .map((job: Job, index: number) => (
              <tr
                className={`text-center border-b border-neutral-300 dark:border-gray-900 bg-neutral-50 dark:bg-gray-900`}
                key={index}
              >
                <td className="py-4">{job.title}</td>
                <td>{job.company}</td>
                <td>{job.schedule}</td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{job.timestamp}</td>
                <td>
                  <button onClick={() => unpin(job)}>
                    <Pin className="text-rose-500" />
                  </button>
                  <button onClick={() => openLinkInBrowser(job.link)}>
                    <Link className="w-3 ml-2 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          {rowsFromSocket
            .filter((job: Job) =>
              Object.values(job).some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(filterCriteria.toLowerCase()),
              ),
            )
            .map((job: Job, index: number) => (
              <tr
                className={`text-center border-b border-neutral-300 dark:border-gray-900`}
                key={index}
              >
                <td className="py-4">{job.title}</td>
                <td>{job.company}</td>
                <td>{job.schedule}</td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{job.timestamp}</td>
                <td>
                  <button>
                    <Pin className="text-gray-500" />
                  </button>
                  <button onClick={() => openLinkInBrowser(job.link)}>
                    <Link className="w-3 ml-2 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          {jobsFromDb
            ?.filter((job: Job) =>
              Object.values(job).some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(filterCriteria.toLowerCase()),
              ),
            )
            .map((job: Job, index: number) => (
              <tr
                className="text-center border-b border-neutral-300 dark:border-gray-900"
                key={index}
              >
                <td className="py-4">{job.title}</td>
                <td>{job.company}</td>
                <td>{job.schedule}</td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{job.timestamp}</td>
                <td>
                  <button onClick={() => pin(job)}>
                    <Pin className="text-gray-500" />
                  </button>
                  <button onClick={() => openLinkInBrowser(job.link)}>
                    <Link className="w-3 ml-2 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
        </table>
        {rowsFromSocket.length === 0 && data?.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-gray-500">No tasks to display.</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
}
