import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Select, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.datarole);
  const [dataFe] = useState(window.store.products2);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);

  const [dataBackend, setDataBackend] = useState();
  const [dataFrontend, setDataFrontend] = useState();

  const handleShowBox = () => {
    setVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
  };

  const ChangeBox = () => {
    setVisible(false);
  };

  const handleFormSubmit = () => {
    alert("Tạo mới thành công quyền truy cập");
    setVisible(false);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    if (dataPd) {
      const getData = dataPd.map((item) => item.backends);
      const newList = getData[0].map((e) => {
        return { ...e, value: e.title };
      });
      setDataBackend(newList);
    }
  }, []);

  useEffect(() => {
    if (dataFe) {
      const getDataFe = dataFe.map((item) => {
        return { value: item.title };
      });

      setDataFrontend(getDataFe);
    }
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Quản lý các quyền truy cập</h1>
        <Button
          type="primary"
          style={{ fontSize: 12, marginLeft: -500 }}
          onClick={handleShowBox}
        >
          Add
        </Button>
        <Input
          type="text"
          placeholder="Search ..."
          className="searchData"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table_col_header">
              <th>Title</th>
              <th>Description</th>
              <th>Activated</th>
              <th style={{ paddingLeft: 70 }}>Frontend</th>
              <th style={{ paddingLeft: 70 }}>Backend</th>
            </tr>
          </thead>
          {dataPd
            ? dataPd.map((item, index) => (
              item.title !== "root" ?
                <>
                  <div style={{ marginBottom: 10 }}></div>
                  <tbody>
                    <tr
                      style={{ backgroundColor: "#e8ebef", width: "100%" }}
                      key={index}
                      className="tab_role"
                    >
                      <td style={{ textAlign: "center" }}>{item.title}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {String(item.activated) === "true" ? (
                          <CheckOutlined className="icon_active" />
                        ) : (
                          <CloseOutlined className="icon_deactive" />
                        )}
                      </td>
                      <td>
                        <>
                          {dataFe
                            ? dataFe
                                .filter((val) => {
                                  if (searchProduct === "") {
                                    return val;
                                  } else if (
                                    val.title
                                      .toLowerCase()
                                      .includes(searchProduct.toLowerCase())
                                  ) {
                                    return val;
                                  }
                                })
                                .map((item) =>
                                  item.description !== "" ? (
                                    <tr>
                                      <Tooltip
                                        placement="top"
                                        title={item.description}
                                      >
                                        <td
                                          className="title_role"
                                          style={{ paddingLeft: 70 }}
                                        >
                                          {item.title}
                                        </td>
                                      </Tooltip>
                                    </tr>
                                  ) : null
                                )
                            : null}
                        </>
                      </td>
                      <td>
                        <>
                          {item.backends
                            ? item.backends
                                .filter((val) => {
                                  if (searchProduct === "") {
                                    return val;
                                  } else if (
                                    val.title
                                      .toLowerCase()
                                      .includes(searchProduct.toLowerCase())
                                  ) {
                                    return val;
                                  }
                                })
                                .map((item) => (
                                  <tr>
                                    <Tooltip
                                      placement="top"
                                      title={item.description}
                                    >
                                      <td className="title_role">
                                        {item.title}
                                      </td>
                                    </Tooltip>
                                  </tr>
                                ))
                            : null}
                        </>
                      </td>
                    </tr>
                  </tbody>
                </>
              : null))
            : null}
        </table>
        {visible && (
          <Modal
            visible={visible}
            title="Add new role"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
              <Form.Item name="activated" label="Activated">
                <Select>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="frontend" label="Frontend">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tag frontend"
                  onChange={handleChange}
                  options={dataFrontend}
                ></Select>
              </Form.Item>

              <Form.Item name="backend" label="Backend">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tag frontend"
                  onChange={handleChange}
                  options={dataBackend}
                ></Select>
              </Form.Item>

              <div className="box_products">
                <Button key="submit" type="primary" htmlType="submit">
                  Add
                </Button>
                <Button type="danger" onClick={ChangeBox}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TabData;
