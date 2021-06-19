import axios from "axios";

export const ProductApi = async () => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const pushActive = async () => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.post(url);
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};

export const putFunc = async (tab) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, {log: tab});
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};
