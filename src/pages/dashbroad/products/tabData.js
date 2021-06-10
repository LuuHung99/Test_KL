import React, { useState, useEffect } from "react";
import { Input, Form, Button, Table, Modal, Select } from "antd";
import { ProductApi } from "../../../services/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "title",
//     key: "name",
//   },
//   {
//     title: "Url",
//     dataIndex: "url",
//     key: "url",
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//   },

//   {
//     title: "Activated",
//     key: "activated",
//     dataIndex: "activated",
//     render: (activated) =>
//       String(activated) && (
//         <>
//           {String(activated) === "true" ? (
//             <CheckOutlined
//               style={{ color: "green", fontSize: "20px", marginLeft: 20 }}
//             />
//           ) : (
//             <CloseOutlined
//               style={{ color: "red", fontSize: "20px", marginLeft: 20 }}
//             />
//           )}
//         </>
//       ),
//   },
//   {
//     title: "Author",
//     key: "author",
//     dataIndex: "author",
//   },
// ];

function TabData(props) {
  const [dataPd, setDataPd] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await ProductApi();
      if (response) {
        setDataPd(response);
      }
    };
    getData();
  }, []);

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
    alert("Cap nhat du lieu thanh cong");
    setVisible(false);
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
      {/* { Array.isArray(dataPd) && dataPd.filter((val) => {
        if (searchProduct === "") {
          return val;
        } else if (
          val.title.toLowerCase().includes(searchProduct.toLowerCase())
        ) {
          return val;
        }
      }) && (
        <Table
          columns={columns}
          dataSource={dataPd}
          onRow={(record) => {
            return {
              onClick: () => {
                setUserClicked(record);
                showModal();
              },
            };
          }}
        />
      )} */}
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
                        onClick={handleShowBox}
                      >
                        <td>{item.title}</td>
                        <td>{item.url}</td>
                        <td>{item.description}</td>
                        <td>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined
                              style={{
                                color: "green",
                                fontSize: "20px",
                                marginLeft: 20,
                              }}
                            />
                          ) : (
                            <CloseOutlined
                              style={{
                                color: "red",
                                fontSize: "20px",
                                marginLeft: 20,
                              }}
                            />
                          )}
                        </td>

                        <td>{item.author}</td>
                      </tr>
                      {visible && (
                        <Modal
                          visible={visible}
                          title={`Thay đổi trạng thái ${item.title} `}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          footer={[]}
                          
                        >
                          <Form
                            {...layout}
                            // initialValues={userClicked}
                            name="control-hooks"
                            onFinish={handleFormSubmit}
                            // form={form}
                          >
                            <h2>Lý do</h2>
                            <TextArea rows={4} />

                            <Form.Item
                              name="role"
                              label="Trạng thái"
                              style={{ marginTop: 20 }}
                            >
                              <Select style={{ width: 230 }}>
                                <Select.Option value="Activated">
                                  Activated
                                </Select.Option>
                                <Select.Option value="UnActivated">
                                  UnActivated
                                </Select.Option>
                              </Select>
                            </Form.Item>

                            <div
                              style={{
                                justifyContent: "center",
                                display: "flex",
                                alignContent: "center",
                              }}
                            >
                              <Button
                                key="submit"
                                type="primary"
                                htmlType="submit"
                              >
                                Cập nhật
                              </Button>
                              <Button type="danger" onClick={ChangeBox}>
                                Cancel
                              </Button>
                            </div>
                          </Form>
                        </Modal>
                      )}
                    </>
                  ) : null
                )
            : null}
        </table>
      </div>
    </div>
  );
}

export default TabData;
