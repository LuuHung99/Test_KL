import React, { useState } from "react";
import { Input, Button, message } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import AddFunc from "./AddFunc";
import UpdateFunc from "./UpdateFunc";
import UpdateActive from "../components/UpdateActive";
import "../css/tab-data.css";

import {
  getAllTab,
  createFrontend,
  updateActivedFrontend,
  updateFe,
} from "../../../../redux/actions/tab.action";

import { getAllProducts } from "../../../../redux/actions/product.action";
import { getAllRoles } from "../../../../redux/actions/role.action";
import { useDispatch, useSelector } from "react-redux";

function TabData(props) {
  const frontends = useSelector((state) => state.tabs.tabs);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);

  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  // const [paginate, setPaginate] = useState(
  //   frontends.filter((item, index) => item && index < 10)
  // );

  // //Phan trang
  // const setPage = (page) => {
  //   setPaginate(
  //     frontends.filter(
  //       (item, index) => item && index <= page * 10 && index > (page - 1) * 10
  //     )
  //   );
  // };

  const handleShowBox = (item) => {
    setVisible(true);
    setItemSelected(item);
  };

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
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
    setVisible(false);
    setModel(false);
    setEditBox(false);
  };

  const handleFormSubmitUpdateFrontend = async (value) => {
    const item = frontends.map((item) => item.url).indexOf(value.url);
    const request = { _id: editSelected._id };

    if (value["url"] !== undefined) {
      request.url = value["url"];
    }
    if (value["title"] !== undefined) {
      request.title = value["title"];
    }
    if (value["description"] !== undefined) {
      request.description = value["description"];
    }
    if (value["author"] !== undefined) {
      request.author = value["author"];
    }
    if (item === -1) {
      dispatch(updateFe(request)).then((result) => {
        if (result) {
          dispatch(getAllTab());
          dispatch(getAllProducts());
          dispatch(getAllRoles());
        }
      });
      message.success("Cập nhật thành công chức năng frontend", 2);
      setEditBox(false);
    } else {
      message.error("Đường dẫn đã tồn tại. Xin mời nhập lại!", 2);
    }
  };

  const handleAddInfor = async (title, url, description, author) => {
    const item = frontends.map((item) => item.url).indexOf(url);
    const f = {
      title: title,
      url: url,
      description: description,
      activated: true,
      author: author,
      parentId: "",
    };
    if (item === -1) {
      if (f.title && f.url && f.description && f.author) {
        dispatch(createFrontend(f)).then((result) => {
          if (result) {
            dispatch(getAllTab());
            dispatch(getAllProducts());
          }
        });
        message.success("Thêm thành công chức năng frontend", 2);
        setModel(false);
      }
    } else {
      message.error("Đường dẫn đã tồn tại. Xin mời nhập lại!");
    }
  };

  const handleClickActive = async (id, active, author, reason) => {
    const l = {
      funcId: id,
      funcType: "frontend",
      reason: reason,
      username: author,
      activated: active ? false : true,
    };
    dispatch(updateActivedFrontend(l)).then((result) => {
      if (result) {
        dispatch(getAllTab());
        dispatch(getAllProducts());
        dispatch(getAllRoles());
      }
    });
    message.success("Cập nhật thành công trạng thái chức năng frontend", 2);
    setVisible(false);
  };

  return (
    <div className="container_tabdata">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h1 style={{ color: "green" }}>Bảng chức năng Frontend</h1>
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
          value={searchProduct}
          prefix={
            <SearchOutlined style={{ fontSize: "20px", color: "#8699ad" }} />
          }
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table_col_header">
              <th>Tên</th>
              <th>Đường dẫn</th>
              <th>Miêu tả</th>
              <th>Trạng thái</th>
              <th>Tác giả</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          {frontends.length > 0
            ? frontends
                .filter((val) =>
                  val.title.toLowerCase().includes(searchProduct.toLowerCase())
                    ? val
                    : null
                )
                .map((item, index) =>
                  item.description !== "" ? (
                    <tbody key={index}>
                      <tr
                        className={
                          item.activated === true
                            ? "table_col_content"
                            : "table_col_content_unactivated"
                        }
                      >
                        <td style={{ minWidth: 130 }}>{item.title}</td>
                        <td>{item.url}</td>
                        <td>{item.description}</td>
                        <td onClick={() => handleShowBox(item)} style={{minWidth: 120}}>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                        <td style={{ minWidth: 130 }}>{item.author}</td>
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
                  ) : null
                )
            : null}
        </table>

        {/* <Pagination
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
          defaultCurrent={1}
          total={frontends.length}
          onChange={(page) => setPage(page)}
        /> */}

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
          <AddFunc
            model={model}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleAddInfor={handleAddInfor}
            ChangeBox={ChangeBox}
          />
        )}

        {editBox && (
          <UpdateFunc
            editBox={editBox}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleFormSubmitUpdateFrontend={handleFormSubmitUpdateFrontend}
            ChangeBox={ChangeBox}
            editSelected={editSelected}
          />
        )}
      </div>
    </div>
  );
}

export default TabData;
