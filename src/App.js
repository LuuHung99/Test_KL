import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppRouter from "./pages/index";
import { createCategories } from "./services/middlewares";
import {
  GetApiSideBar,
  GetActiveBackend,
  GetActiveFrontend,
  GetActiveRole,
  ProductApi,
  ResourceApi,
  RoleApi,
  UserApi,
} from "./services/api";

function App() {
  const [dataFrontend, setDataFrontend] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataRole, setDataRole] = useState([]);
  const [dataResource, setDataResource] = useState([]);
  const [dataActivatedFe, setDataActivatedFe] = useState([]);
  const [dataActivatedBe, setDataActivatedBe] = useState([]);
  const [dataActivatedRole, setDataActivatedRole] = useState([]);
  const [dataSideBar, setDataSideBar] = useState([]);

  window.store = {
    products: createCategories(dataSideBar.concat(dataFrontend)),
    datatab: dataFrontend,
    datauser: dataUser,
    datarole: dataRole,
    dataresource: dataResource,
    activatedFe: dataActivatedFe,
    activatedBe: dataActivatedBe,
    activatedRole: dataActivatedRole,
    datasidebar: dataSideBar.concat(dataFrontend),
  };

  useEffect(() => {
    const getDataSideBar = async () => {
      const dataSideBar = await GetApiSideBar();
      if (dataSideBar) {
        setDataSideBar(dataSideBar);
      }
    };
    getDataSideBar();
  }, []);

  useEffect(() => {
    const getDataFrontend = async () => {
      const dataFrontend = await ProductApi();
      if (dataFrontend) {
        setDataFrontend(dataFrontend);
      }
    };
    getDataFrontend();
  }, []);

  useEffect(() => {
    const getDataBackend = async () => {
      const dataBackend = await ResourceApi();
      if (dataBackend) {
        setDataResource(dataBackend);
      }
    };
    getDataBackend();
  }, []);

  useEffect(() => {
    const getDataRoles = async () => {
      const dataRole = await RoleApi();
      if (dataRole) {
        setDataRole(dataRole);
      }
    };
    getDataRoles();
  }, []);

  useEffect(() => {
    const getDataUsers = async () => {
      const dataUser = await UserApi();
      if (dataUser) {
        setDataUser(dataUser);
      }
    };
    getDataUsers();
  }, []);

  useEffect(() => {
    const getDataActivateFe = async () => {
      const dataActivateFe = await GetActiveFrontend();
      if (dataActivateFe) {
        setDataActivatedFe(dataActivateFe);
      }
    };
    getDataActivateFe();
  }, [setDataFrontend]);

  useEffect(() => {
    const getDataActivateBe = async () => {
      const dataActivateBe = await GetActiveBackend();
      if (dataActivateBe) {
        setDataActivatedBe(dataActivateBe);
      }
    };
    getDataActivateBe();
  }, []);

  useEffect(() => {
    const getDataActivateRole = async () => {
      const dataActivateRole = await GetActiveRole();
      if (dataActivateRole) {
        setDataActivatedRole(dataActivateRole);
      }
    };
    getDataActivateRole();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
