import axios from "axios";

export const ProductApi = async () => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const pushActiveFrontend= async (tab) => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.put(url, {tab});
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};

export const pushActiveBackend= async (backend) => {
  const url = "http://localhost:5000/api/root/backend";
  const response = await axios.put(url, {backend});
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};

export const putFunc = async (tab) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, { log: tab });
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};

export const UserApi = async () => {
  const url = "http://localhost:5000/api/root/user";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const RoleApi = async () => {
  const url = "http://localhost:5000/api/root/role";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const ResourceApi = async () => {
  const url = "http://localhost:5000/api/root/backend";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

export const GetResourceApi = async (backend) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, {log: backend });
  const result = (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
}
