import { socket } from "@/socket";
import { useState, useEffect } from "react";

interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  schedule: string;
  status: string;
}

// Event emitter functions
export const startTask = (username: string | null, password: string | null) => {
  socket.emit("servicestart", username, password);
};

export const captchaAnswer = (ans: number) => {
  socket.emit("captchaAnswer", ans);
};

// Custom hook to manage socket events
export const useSocketListeners = () => {
  const [status, setStatus] = useState("Start Task");
  const [process, setProcess] = useState("Starting service...");
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);
  const [captchaProcess, setCaptchaProcess] = useState<number>(0);
  const [rowsFromSocket, setRowsFromSocket] = useState<Job[]>([]);

  useEffect(() => {
    // Socket listeners
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

    socket.on("job", (obj) => {
      setRowsFromSocket((prevState) => [obj, ...prevState]);
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("running");
      socket.off("stopped");
      socket.off("process");
      socket.off("screenshot");
      socket.off("error");
      socket.off("job");
    };
  }, []);

  return {
    status,
    process,
    captchaImg,
    captchaProcess,
    rowsFromSocket,
  };
};
