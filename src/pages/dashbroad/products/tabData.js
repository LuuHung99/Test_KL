import React, { useState } from "react";
import { Input, Form, Button, Modal } from "antd";
import { pushActive, putFunc } from "../../../services/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.products2);
  const [visible, setVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [reason, setReason] = useState("");

  const handleShowBox = (item) => {
    setVisible(true);
    setItemSelected(item);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
  };

  const ChangeBox = () => {
    setVisible(false);
  };

  const handleFormSubmit = () => {
    alert("Thay đổi trạng thái thành công!");
    setVisible(false);
  };

  const handleClickActive = async (id, active, author, value) => {
    // const f = {
    //   _id: id,
    //   activated: active ? false : true,
    // };

    const l = {
      funcId: id,
      funcType: "frontend",
      reason: value,
      username: author,
      activated: active ? false : true,
    };
    await putFunc(l);
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng</h1>
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
                      <tbody>
                        <tr
                          className={
                            item.activated === true
                              ? "table_col_content"
                              : "table_col_content_unactivated"
                          }
                          key={index}
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
      </div>
    </div>
  );
}

export default TabData;
