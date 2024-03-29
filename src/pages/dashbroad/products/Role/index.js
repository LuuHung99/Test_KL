import React, { useState, useEffect } from "react";
import { Button, Input, Tooltip, message } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "../css/tab-data.css";
import UpdateActive from "../components/UpdateActive";
import AddRole from "./AddRole";
import UpdateRoles from "./UpdateRole";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoles,
  getAllRoles,
  updateRole,
  updateActivedRole,
  getAllActveRoles

} from "../../../../redux/actions/role.action";
import { getAllUsers } from "../../../../redux/actions/user.action";

function Role(props) {
  const backends = useSelector((state) => state.backends.backends);
  const frontends = useSelector((state) => state.tabs.tabs);
  const dataRole = useSelector((state) => state.roles.roles);

  const dispatch = useDispatch();

  const [activeBackend, setActiveBackend] = useState();
  const [activeFe, setActiveFe] = useState();

  const [searchProduct, setSearchProduct] = useState("");

  const [visible, setVisible] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [model, setModel] = useState(false);

  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  const [frontend, setFrontend] = useState();
  const [backend, setBackend] = useState();

  useEffect(() => {
    const getDataFe = frontends.map((item) => {
      return { ...item, value: item.title };
    });
    setActiveFe(getDataFe);
  }, [frontends]);

  useEffect(() => {
    const getDataBe = backends.map((item) => {
      return { ...item, value: item.title };
    });
    setActiveBackend(getDataBe);
  }, [backends]);

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
  };

  const handleShowBox = () => {
    setModel(true);
  };

  const handleShowModel = (item) => {
    setItemSelected(item);
    setVisible(true);
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

  const handleFormSubmitAddRole = () => {
    message.success("Thêm mới thành công quyền truy cập", 2);
    setModel(false);
  };

  const handleFormSubmitUPdateRole = async (value) => {
    const request = { _id: editSelected._id };

    if (value["title"] !== undefined) {
      request.title = value["title"];
    }
    if (value["description"] !== undefined) {
      request.description = value["description"];
    }
    if (frontend !== undefined) {
      request.tabs = frontend;
    }
    if (backend !== undefined) {
      request.backends = backend;
    }
    // console.log("request", request);
    dispatch(updateRole(request)).then((result) => {
      if (result) {
        dispatch(getAllRoles());
        dispatch(getAllUsers());
      }
    });
    message.success("Cập nhật thành công quyền truy cập", 2);
    setEditBox(false);
  };

  const handleChangeFrontend = (frontend, id) => {
    const newId = id.map((item) => item._id);
    console.log("data fe", newId);
    setFrontend(newId);
  };

  const handleChangeBackend = (backend, id) => {
    const newId = id.map((item) => item._id);
    setBackend(newId);
  };

  const handleAddInfor = async (title, description, frontend, backend) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      tabs: frontend,
      backends: backend,
    };
    if (f.title && f.description && f.tabs && f.backends) {
      dispatch(createRoles(f)).then((result) => {
        if (result) {
          dispatch(getAllRoles())
          dispatch(getAllActveRoles())
        } ;
      });
    }
  };

  const handleClickActive = async (id, active, title, value) => {
    const l = {
      roleId: id,
      reason: value,
      username: title,
      type: active ? false : true,
      activated: active ? false : true,
    };
    dispatch(updateActivedRole(l)).then((result) => {
      if (result) {
        dispatch(getAllRoles());
        dispatch(getAllUsers());
      }
    });

    message.success("Cập nhật thành công trạng thái quyền truy cập", 2);
    setVisible(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h1 style={{ color: "green" }}>Quản lý các quyền truy cập</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, position: "absolute", left: 300 }}
          onClick={handleShowBox}
          icon={<PlusOutlined />}
        >
          Thêm quyền truy cập
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
              <th>Miêu tả</th>
              <th>Trạng thái</th>
              <th>Frontend</th>
              <th>Backend</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          {dataRole
            ? dataRole
                .filter((val) =>
                  val.title.toLowerCase().includes(searchProduct.toLowerCase())
                    ? val
                    : null
                )
                .map((item, index) =>
                  // item.title !== "Root" ? (
                    <tbody key={index}>
                      <tr
                        className={
                          item.activated === true
                            ? "table_col_content_role"
                            : "table_col_content_unactivated_role"
                        }
                      >
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td onClick={() => handleShowModel(item)}>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                        <td>
                          {item.tabs
                            ? item.tabs.map((item, index) => (
                                <Tooltip
                                  placement="top"
                                  title={item.description}
                                  key={index}
                                >
                                  <div className="title_role">{item.title}</div>
                                </Tooltip>
                              ))
                            : null}
                        </td>
                        <td>
                          {item.backends
                            ? item.backends.map((item, index) => (
                                <Tooltip
                                  placement="top"
                                  title={item.description}
                                  key={index}
                                >
                                  <div className="title_role">{item.title}</div>
                                </Tooltip>
                              ))
                            : null}
                        </td>
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
                  // ) : null
                )
            : null}
        </table>

        {model && (
          <AddRole
            model={model}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleFormSubmitAddRole={handleFormSubmitAddRole}
            handleChangeFrontend={handleChangeFrontend}
            handleChangeBackend={handleChangeBackend}
            handleAddInfor={handleAddInfor}
            ChangeBox={ChangeBox}
            frontend={frontend}
            backend={backend}
            dataFrontend={activeFe}
            dataBackend={activeBackend}
          />
        )}

        {visible && (
          <UpdateActive
            visible={visible}
            handleCancel={handleCancel}
            handleOk={handleOk}
            handleClickActive={handleClickActive}
            ChangeBox={ChangeBox}
            itemSelected={itemSelected}
          />
        )}

        {editBox && (
          <UpdateRoles
            editBox={editBox}
            editSelected={editSelected}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleFormSubmitUPdateRole={handleFormSubmitUPdateRole}
            handleChangeFrontend={handleChangeFrontend}
            handleChangeBackend={handleChangeBackend}
            ChangeBox={ChangeBox}
            dataFrontend={activeFe}
            dataBackend={activeBackend}
          />
        )}
      </div>
    </div>
  );
}

export default Role;
