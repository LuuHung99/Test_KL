import React, { useState, useEffect } from "react";
import { Input, Form, Button, Modal, Select } from "antd";
import { putFunc, pushActive, ProductApi } from "../../../services/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.products2); //có hiểu gì k đấy. Cập nhật lại state này á,cập nhật lại cái store.ptoduct2
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [reason, setReason] = useState("");
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

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
  };

  const ChangeBox = () => {
    setVisible(false);
    setModel(false);
  };

  const handleFormSubmit = () => {
    alert("Thêm chức năng thành công");
    setVisible(false);
    setModel(false);
  };

  const handleAddInfor = async (value, value1, value2, value3, value4) => {
    const f = {
      title: value,
      url: value1,
      description: value2,
      activated: true,
      author: value4,
      parentId: "",
    };
    await pushActive(f);
    const newData = await ProductApi();
    window.store["products2"] = newData;
    setDataPd(newData); 
    //giờ mày cần làm 2 việc, post or put thì sau đó phải get lại ngay rồi cậ nhật global state
    
  };

  const handleClickActive = async (id, active, author, value) => {
    const l = {
      funcId: id,
      funcType: "frontend",
      reason: value,
      username: author,
      activated: active ? false : true,
    };
    await putFunc(l);
    setReason("");
    const newData = await ProductApi();
    window.store["products"] = newData;
    setDataPd(newData);
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Frontend</h1>
        <Button
          type="primary"
          style={{ fontSize: 12, marginLeft: -500 }}
          onClick={handleShowModel}
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
              <th>Url</th>
              <th>Description</th>
              <th>Activated</th>
              <th>Author</th>
            </tr>
          </thead>
          {dataPd.length > 0
            ? dataPd
                // eslint-disable-next-line array-callback-return
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
                .map((item, index) =>
                  item.description !== "" ? (
                    <>
                      <div style={{ marginBottom: 10 }}></div>
                      <tbody key={index}>
                        <tr
                          className={
                            item.activated === true
                              ? "table_col_content"
                              : "table_col_content_unactivated"
                          }
                          onClick={() => handleShowBox(item)}
                        >
                          <td>{item.title}</td>
                          <td>{item.url}</td>
                          <td>{item.description}</td>
                          <td>
                            {String(item.activated) === "true" ? (
                              <CheckOutlined className="icon_active" />
                            ) : (
                              <CloseOutlined className="icon_deactive" />
                            )}
                          </td>
                          <td>{item.author}</td>
                        </tr>
                      </tbody>
                    </>
                  ) : null
                )
            : null}
        </table>
        {visible && (
          <Modal
            visible={visible}
            title={`${itemSelected.activated ? "Activated" : "Deactivated"} ${
              itemSelected.title
            }`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
              <h2>Lý do</h2>
              <TextArea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="box_products">
                <Button
                  key="submit"
                  type={itemSelected.activated ? "ghost" : "primary"}
                  htmlType="submit"
                  onClick={() =>
                    handleClickActive(
                      itemSelected._id,
                      itemSelected.activated,
                      itemSelected.author,
                      reason
                    )
                  }
                >
                  {itemSelected.activated ? "Deactivated" : "Activated"}
                </Button>
                <Button type="danger" onClick={ChangeBox}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal>
        )}

        {model && (
          <Modal
            visible={model}
            title="Add new frontend"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
              <Form.Item name="title" label="Title">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="url" label="Url">
                <Input
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="activated" label="Activated">
                <Select>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="author" label="Author">
                <Input
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                />
              </Form.Item>

              <div className="box_products">
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    handleAddInfor(value, value1, value2, value3, value4)
                  }
                >
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
