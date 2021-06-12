import React, { useState, useEffect } from "react";
import { Input, Form, Button, Table, Modal, Select } from "antd";
import { pushActive, ProductApi } from "../../../services/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.products2);
  const [visible, setVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();

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
    alert("Cap nhat du lieu thanh cong");
    setVisible(false);
  };

  const handleClickActive = async(id, active) => {
    const frontend = { _id: id, activated: active ? false : true };
    setItemSelected(frontend)

    const getData = async () => await pushActive(frontend).then((l) => {
      console.log(l);

    }).catch((e) => {console.log(e)})
    await getData();
   
    // await pushActive(fontend);
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng</h1>
        <Input
          type="text"
          placeholder="Search ..."
          style={{
            width: "20%",
            border: "none",
            borderRadius: 5,
          }}
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <tr className="table_col_header">
            <th>Title</th>
            <th>Url</th>
            <th>Description</th>
            <th>Activated</th>
            <th>Author</th>
          </tr>
          {dataPd.length > 0
            ? dataPd
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
                      <hr style={{ width: 0, opacity: 0.6, marginTop: 0 }} />
                      <tr
                        className={
                          String(item.activated) === "true"
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
              <TextArea rows={4} />
            </Form>
            <div className="box_products">
              <Button
                key="submit"
                type={itemSelected.activated ? "ghost" : "primary"}
                htmlType="submit"
                onClick={() =>
                  handleClickActive(itemSelected._id, itemSelected.activated)
                }
              >
                {itemSelected.activated ? "Deactivated" : "Activated"}
              </Button>
              <Button type="danger" onClick={ChangeBox}>
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TabData;
