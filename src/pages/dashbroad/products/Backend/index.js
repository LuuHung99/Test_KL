import React, { useState, useEffect } from "react";
import { Input, Button, message, Pagination } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "../css/tab-data.css";
import {
  BackendToFuncLog,
  ResourceApi,
  pushBackend,
  UpdateBackend,
} from "../../../../services/api";
import LoadingData from "../../../../components/loadingData";
import AddBack from "./AddBack";
import UpdateBack from "./UpdateBack";
import UpdateActive from "../components/UpdateActive";

function Resource(props) {
  const [dataPd, setDataPd] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);

  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  //Phan trang

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setLoading(true);
    const data = await ResourceApi();
    if (data) {
      setDataPd(data);
      const total_results = data.length;
      setTotalItems(total_results);
      const total_pages = Math.round(total_results / 10);
      if (page < 1) {
        setPage(1);
      } else if (page > total_pages) {
        setPage(total_pages);
      }

      setLoading(false);
    }
  };

  if (loading && dataPd.length === 0) {
    return <LoadingData />;
  }

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
  };

  const handleShowBox = (item) => {
    setVisible(true);
    setItemSelected(item);
  };

  const handleShowModel = () => {
    setModel(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
    setModel(false);
    setEditBox(false);
  };

  const ChangeBox = () => {
    setModel(false);
    setVisible(false);
    setEditBox(false);
  };

  const handleFormSubmitUpdateFrontend = async (value) => {
    const request = { _id: editSelected._id };

    if (value["title"] !== undefined) {
      request.title = value["title"];
    }
    if (value["description"] !== undefined) {
      request.description = value["description"];
    }
    if (value["http"] !== undefined) {
      request.httpVerb = value["http"];
    }
    if (value["path"] !== undefined) {
      request.locationPath = value["path"];
    }

    await UpdateBackend(request);
    message.success("Cập nhật thành công chức năng backend", 2);
    setEditBox(false);
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };

  const handleClickActive = async (id, active, value) => {
    const l = {
      funcId: id,
      funcType: "backend",
      reason: value,
      username: "Root admin",
      activated: active ? false : true,
    };
    await BackendToFuncLog(l);
    alert("Thay đổi thành công trạng thái chức năng backend");
    message.success("Cập nhật thành công trạng thái chức năng backend", 2);
    setVisible(false);
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };


  const handleAddInfor = async (title, http, description, path) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      httpVerb: http,
      locationPath: path,
    };
    await pushBackend(f);
    message.success("Thêm thành công chức năng backend", 2);
    setModel(false);
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Backend</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -450 }}
          onClick={handleShowModel}
          icon={<PlusOutlined />}
        >
          Thêm chức năng
        </Button>
        <Input
          type="text"
          placeholder="Tìm kiếm ..."
          className="searchData"
          prefix={
            <SearchOutlined style={{ fontSize: "20px", color: "#8699ad" }} />
          }
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table_col_header">
              <th>Tên</th>
              <th>Đường dẫn</th>
              <th>Phương thức</th>
              <th>Trạng thái</th>
              <th>Miêu tả</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          {dataPd
            ? dataPd
                .filter((val) =>
                  val.title.toLowerCase().includes(searchProduct.toLowerCase())
                    ? val
                    : null
                )
                .map((item, index) => (
                  <tbody key={index}>
                    <tr
                      className={
                        item.activated === true
                          ? "table_col_content"
                          : "table_col_content_unactivated"
                      }
                    >
                      <td>{item.title}</td>
                      <td>{item.locationPath}</td>
                      <td>{item.httpVerb}</td>
                      <td onClick={() => handleShowBox(item)}>
                        {String(item.activated) === "true" ? (
                          <CheckOutlined className="icon_active" />
                        ) : (
                          <CloseOutlined className="icon_deactive" />
                        )}
                      </td>
                      <td>{item.description}</td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#00acc1",
                              border: "none",
                              color: "white",
                            }}
                            icon={<FormOutlined />}
                            onClick={() => handleEditBox(item)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
            : null}
        </table>
        {visible && (
          <UpdateActive
            itemSelected={itemSelected}
            ChangeBox={ChangeBox}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleClickActive={handleClickActive}
            visible={visible}
          />
        )}

        {model && (
          <AddBack
            model={model}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleAddInfor={handleAddInfor}
            ChangeBox={ChangeBox}
          />
        )}

        {editBox && (
          <UpdateBack
            editBox={editBox}
            handleOk={handleOk}
            handleCancel={handleCancel}
            changeBox={ChangeBox}
            handleFormSubmitUpdateFrontend={handleFormSubmitUpdateFrontend}
            editSelected={editSelected}
          />
        )}
        <Pagination
          current={page}
          pageSize={10}
          total={totalItems}
          onChange={(pages) => setPage(pages)}
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        />
      </div>
    </div>
  );
}

export default Resource;
