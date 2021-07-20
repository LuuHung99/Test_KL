import React, { useState, useEffect } from "react";
import { Input, Button, message, Pagination } from "antd";
import {
  FrontendToFuncLog,
  pushFrontend,
  ProductApi,
  UpdateFrontend,
} from "../../../../services/api";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import LoadingData from "../../../../components/loadingData";
import AddFunc from "./AddFunc";
import UpdateFunc from "./UpdateFunc";
import UpdateActive from "../components/UpdateActive";
import "../css/tab-data.css";

function TabData(props) {
  const [dataPd, setDataPd] = useState([]);
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);
  
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  //Phan trang

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getData = async () => {
    setLoading(true);
    const data = await ProductApi();
    if (data) {
      setDataPd(data);
      const total_results = data.length;
      setTotalItems(total_results);
      const total_pages = Math.ceil(total_results / 10);
      if (page < 1) {
        setPage(1);
      } else if (page > total_pages) {
        setPage(total_pages);
      }

      setLoading(false);
    }
  };

  if (loading || dataPd.length === 0) {
    return <LoadingData />;
  }

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
    await UpdateFrontend(request);
    message.success("Cập nhật thành công chức năng frontend", 2);
    setEditBox(false);
    const newData = await ProductApi();
    window.store["datatab"] = newData;
    setDataPd(newData);
  };

  const handleAddInfor = async (title, url, description, author) => {
    const f = {
      title: title,
      url: url,
      description: description,
      activated: true,
      author: author,
      parentId: "",
    };
    if(f.title && f.url && f.description && f.author) {
      await pushFrontend(f);
      message.success("Thêm thành công chức năng frontend", 2);
      setModel(false);
      const newData = await ProductApi();
      window.store["datatab"] = newData;
      setDataPd(newData);
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
    if(l.reason !== "") {
      await FrontendToFuncLog(l);
      alert("Thay đổi thành công trạng thái chức năng frontend");
      message.success("Cập nhật thành công trạng thái chức năng frontend", 2);
      setVisible(false);
      const newData = await ProductApi();
      window.store["datatab"] = newData;
      setDataPd(newData);
    }
    
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Frontend</h1>
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
          {dataPd.length > 0
            ? dataPd
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
                        <td>{item.title}</td>
                        <td>{item.url}</td>
                        <td>{item.description}</td>
                        <td onClick={() => handleShowBox(item)}>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                        <td>{item.author}</td>
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

export default TabData;
