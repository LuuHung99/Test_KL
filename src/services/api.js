import axios from "axios";

export const ProductApi = async () => {
  const url = "http://localhost:5000/api/root/frontend";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const pushActive = async (frontend) => {
  const url = "http://localhost:5000/api/root/frontend";
  console.log(frontend);
  const response = await axios.post(url, JSON.stringify(frontend));
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};

export const putFunc = async (frontend) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, frontend);
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};
