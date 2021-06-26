import axios from "axios";

/* Get API Sidebar */
export const getApiSideBar = async () => {
  const url = "http://localhost:5000/api/root/sidebar";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/*----------------------------------------------------------------*/

/* API - Front-end */
/* Get all Api Frontend */
export const ProductApi = async () => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/* Add Frontend */
export const pushActiveFrontend = async (tab) => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.put(url, { tab });
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};

/* Chage activated Front-end to FuncLog  */
export const FrontendToFuncLog = async (tab) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, { log: tab });
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};

/* Get all Avtivated Backend */

export const FrontendActivated = async () => {
  const url = "http://localhost:5000/api/root/tab/activated";
  const response = await axios.put(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/*End - API Front-end */

/*----------------------------------------------------------------*/

/* API - Back-end */
/* Get all Api Back-end */
export const ResourceApi = async () => {
  const url = "http://localhost:5000/api/root/backend";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/* Add Backend  */
export const pushActiveBackend = async (backend) => {
  const url = "http://localhost:5000/api/root/backend";
  const response = await axios.put(url, { backend });
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};

/* Chage activated Backend to FuncLog  */
export const BackendToFuncLog = async (backend) => {
  const url = "http://localhost:5000/api/root/funcLog";
  const response = await axios.put(url, { log: backend });
  const result =
    (await response.status) === 200 ? "Update successfull" : "Failed update";
  return result;
};

/* Get all Avtivated Backend */
export const BackendActivated = async () => {
  const url = "http://localhost:5000/api/root/backend/activated";
  const response = await axios.put(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/*End - API Front-end */

/*----------------------------------------------------------------*/

/* API - Role */
/* Get all Api Role */
export const RoleApi = async () => {
  const url = "http://localhost:5000/api/root/role";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/* Add Role  */
export const pushRole = async (role) => {
  const url = "http://localhost:5000/api/root/role";
  const response = await axios.put(url, { role });
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/*End - API Role */

/*----------------------------------------------------------------*/

/* API - User */
/* Get all Api User */
export const UserApi = async () => {
  const url = "http://localhost:5000/api/root/user";
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/* Add User  */
export const pushUser = async (user) => {
  const url = "http://localhost:5000/api/root/user";
  const response = await axios.put(url, { user });
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/*End - API User */
