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

  //??????mày làm con mẹ gì ở đây
  //call api
  //hút cần à
  //Truyền data như mấy thằng kia còn gì
  //gọi Effect thôi mà gọi gì mà lắm thế chơi đồ vừathoio
  //T gộp rồi nó lỗi nên viết tách ra mới được
  //Ngáo cần
  //đổi tên hàm là được
  //mày đặt trùng tên nó trả vả choices
  //T đổi rồi không được nên mới viết tách nó ra chức
  //chịu mày rồi
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
