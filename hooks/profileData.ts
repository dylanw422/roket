// hooks/useProfileData.ts

import { useState } from "react";

const useProfileData = () => {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("LinkedInUsername") || "";
  });
  const [password, setPassword] = useState<string>(() => {
    return localStorage.getItem("LinkedInPassword") || "";
  });
  const [jobSearch, setJobSearch] = useState<string>(() => {
    return localStorage.getItem("jobSearch") || "";
  });
  const [experience, setExperience] = useState<string>(() => {
    return localStorage.getItem("experience") || "";
  });
  const [salary, setSalary] = useState<string>(() => {
    return localStorage.getItem("salary") || "";
  });
  const [jobType, setJobType] = useState<string>(() => {
    return localStorage.getItem("jobType") || "";
  });
  const [remote, setRemote] = useState<string>(() => {
    return localStorage.getItem("remote") || "";
  });
  const [recent, setRecent] = useState<string>(() => {
    return localStorage.getItem("recent") || "";
  });
  const [saved, setSaved] = useState<number>(0);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem("LinkedInUsername", username);
      localStorage.setItem("LinkedInPassword", password);
      localStorage.setItem("jobSearch", jobSearch);
      localStorage.setItem("experience", experience);
      localStorage.setItem("salary", salary);
      localStorage.setItem("jobType", jobType);
      localStorage.setItem("remote", remote);
      localStorage.setItem("recent", recent);

      setSaved(1);
      setTimeout(() => setSaved(0), 2000);
    } catch (err) {
      console.error("Error saving data to localStorage", err);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    jobSearch,
    setJobSearch,
    experience,
    setExperience,
    salary,
    setSalary,
    jobType,
    setJobType,
    remote,
    setRemote,
    recent,
    setRecent,
    saved,
    saveToLocalStorage,
  };
};

export default useProfileData;
