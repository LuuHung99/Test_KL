import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import AppRouter from "./pages/index";
import { createCategories } from "./services/middlewares";

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
    // datatab: dataFrontend,
    datauser: dataUser,
    datarole: dataRole,
    dataresource: dataResource,
    activatedFe: dataActivatedFe,
    activatedBe: dataActivatedBe,
    activatedRole: dataActivatedRole,
    datasidebar : dataSideBar.concat(dataFrontend)
  };

  useEffect(() => {
    
    let ProductApi = "http://localhost:5000/api/root/tab";
    let UserApi = "http://localhost:5000/api/root/user";
    let RoleApi = "http://localhost:5000/api/root/role";
    let ResourceApi = "http://localhost:5000/api/root/backend";
    let ActivatedFrontend = "http://localhost:5000/api/root/tab/activated";
    let ActivatedBackend = "http://localhost:5000/api/root/backend/activated";
    let ActivatedRole = "http://localhost:5000/api/root/role/activated";
    let GetApiSidebar = "http://localhost:5000/api/root/sidebar";

    const dataProduct = new Promise((resolve, reject) => {
      resolve(fetch(ProductApi));
    }).then((data) => {
      return data.json();
    }).catch((err) => {console.log("err", err);})
    ;

    const datauser = new Promise((resolve, reject) => {
      resolve(fetch(UserApi));
    }).then((data) => {
      return data.json();
    });

    const datarole = new Promise((resolve, reject) => {
      resolve(fetch(RoleApi));
    }).then((data) => {
      return data.json();
    });

    const dataresource = new Promise((resolve, reject) => {
      resolve(fetch(ResourceApi));
    }).then((data) => {
      return data.json();
    }).catch((err) => {console.log("err backend", err);});

    const dataActivatedFront = new Promise((resolve, reject) => {
      resolve(fetch(ActivatedFrontend));
    }).then((data) => {
      return data.json();
    });

    const dataActivatedBack = new Promise((resolve, reject) => {
      resolve(fetch(ActivatedBackend));
    }).then((data) => {
      return data.json();
    });

    const dataActivatedRol = new Promise((resolve, reject) => {
      resolve(fetch(ActivatedRole));
    }).then((data) => {
      return data.json();
    });

    const getApiSideBar = new Promise((resolve, reject) => {
      resolve(fetch(GetApiSidebar));
    }).then((data) => {
      return data.json();
    });

    Promise.all([
      dataProduct,
      datauser,
      datarole,
      dataresource,
      dataActivatedFront,
      dataActivatedBack,
      dataActivatedRol,
      getApiSideBar
    ])
      .then((res) => {
        setDataFrontend(res[0]);
        setDataUser(res[1]);
        setDataRole(res[2]);
        setDataResource(res[3]);
        setDataActivatedFe(res[4]);
        setDataActivatedBe(res[5]);
        setDataActivatedRole(res[6]);
        setDataSideBar(res[7]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
