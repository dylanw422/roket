import axios from "axios";

export const getAllJobs = async () => {
  const { data } = await axios.get("/api/get-jobs");
  return data;
};

export const pinningFn = async (id: number) => {
  const { data } = await axios.post(`/api/pin?id=${id}`, id);
  return data;
};
