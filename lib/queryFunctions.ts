import axios from "axios";

export const getAllJobs = async () => {
  const { data } = await axios.get("/api/get-jobs");
  return data;
};
