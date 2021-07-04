import axios from "axios";

/* Get API Sidebar */
export const GetApiSideBar = async () => {
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

/* Update Frontend */

export const UpdateFrontend = async (update) => {
  const url = "http://localhost:5000/api/root/tab";
  const response = await axios.post(url, {tab: update});
  console.log("UpdateFrontend",response);
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

/* Get all Avtivated Frontend */

export const FrontendActivated = async () => {
  const url = "http://localhost:5000/api/root/tab/activated";
  const response = await axios.put(url);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};

/* Get Activate Frontend */

export const GetActiveFrontend = async () => {
  const url = "http://localhost:5000/api/root/tab/activated";
  const response = await axios.get(url);
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
  console.log("res backend", response);
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};

/* Change activated Backend to FuncLog  */
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

/* Update Backend */

export const UpdateBackend = async (update) => {
  const url = "http://localhost:5000/api/root/backend";
  const response = await axios.post(url, {backend: update});
  console.log("UpdateBackend",response);
  const result = (await response.status) === 200 ? await response.data : {};
  return result;
};


/* Get Activate Backend */

export const GetActiveBackend = async () => {
  const url = "http://localhost:5000/api/root/backend/activated";
  const response = await axios.get(url);
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


/* Update Role */
export const UpdateRole = async (update) => {
  const url = "http://localhost:5000/api/root/role";
  const response = await axios.post(url, {role: update});
  console.log("UpdateRole",response);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};


/* Active to roleHistory */
export const RoleActiveToHistory = async (body) => {
  const url = "http://localhost:5000/api/root/role/activate";
  const response = await axios.post(url, body);
  const result = (await response.status) === 200 ? await response.data : [];
  return result;
};


/* Get Activate Role */

export const GetActiveRole = async () => {
  const url = "http://localhost:5000/api/root/role/activated";
  const response = await axios.get(url);
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
