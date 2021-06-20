import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppRouter from "./pages/index";
import { ProductApi, UserApi, RoleApi, ResourceApi } from "./services/api";
import { createCategories } from "./services/middlewares";

function App() {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataRole, setDataRole] = useState([]);
  const [dataResource, setDataResource] = useState([]);

  window.store = {
    products: createCategories(data),
    products2: data,
    datauser: dataUser,
    datarole: dataRole,
    dataresource: dataResource
  };

  useEffect(() => {
    const getData = async () => {
      const dataFake = await ProductApi();

      if (dataFake) {
        setData(dataFake);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataFake = await UserApi();

      if (dataFake) {
        setDataUser(dataFake);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataFake = await RoleApi();

      if (dataFake) {
        setDataRole(dataFake);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataFake = await ResourceApi();

      if (dataFake) {
        setDataResource(dataFake);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
