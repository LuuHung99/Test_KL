import React, { useState } from "react";
import { Input, Button, Pagination, message } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "../css/tab-data.css";
import AddBack from "./AddBack";
import UpdateBack from "./UpdateBack";
import UpdateActive from "../components/UpdateActive";
import { useDispatch, useSelector } from "react-redux";
import {
  createBackend,
  getAllBackend,
  updateActivedBackend,
  updateBack,
} from "../../../../redux/actions/backend.action";

function Resource(props) {
  const backends = useSelector((state) => state.backends.backends);
  const dispatch = useDispatch();

  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);

  const [paginate, setPaginate] = useState(
    backends.filter((item, index) => item && index < 10)
  );

  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  //Phan trang
  const setPage = (page) => {
    setPaginate(
      backends.filter(
        (item, index) =>
          item && index <= page * 10 - 1 && index >= (page - 1) * 10
      )
    );
  };

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

    dispatch(updateBack(request)).then((result) => {
      if (result) dispatch(getAllBackend());
    });
    message.success("Cập nhật thành công chức năng backend", 2);
    setEditBox(false);
  };

  const handleClickActive = async (id, active, value, username) => {
    const l = {
      funcId: id,
      funcType: "backend",
      reason: value,
      username: username,
      activated: active ? false : true,
    };
    dispatch(updateActivedBackend(l)).then((result) => {
      if (result) dispatch(getAllBackend());
    });
    message.success("Cập nhật thành công trạng thái chức năng backend", 2);
    setVisible(false);
  };

  const handleAddInfor = (title, http, description, path) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      httpVerb: http,
      locationPath: path,
    };
    if (f.title && f.description && f.httpVerb && f.locationPath) {
      dispatch(createBackend(f)).then((result) => {
        if (result) dispatch(getAllBackend());
      });
      message.success("Thêm thành công chức năng backend", 2);
      setModel(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h1 style={{ color: "green" }}>Bảng chức năng Backend</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, position: "absolute", left: 270 }}
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
          {paginate
            ? paginate
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
        <Pagination
          defaultCurrent={1}
          total={backends.length}
          onChange={(page) => setPage(page)}
        />
        <div style={{ width: "100%", height: "100px" }}></div>
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
            ChangeBox={ChangeBox}
            handleFormSubmitUpdateFrontend={handleFormSubmitUpdateFrontend}
            editSelected={editSelected}
          />
        )}
      </div>
    </div>
  );
}

export default Resource;
