import React, { useState } from "react";
import { Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

function TabData(props) {
  const [dataPd] = useState(window.store.datauser);
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng User</h1>
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
            <tr className="table_col_header" style={{ textAlign: "center" }}>
              <th>Roles</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Activated</th>
            </tr>
          </thead>
          {dataPd.length > 0
            ? dataPd
                // eslint-disable-next-line array-callback-return
                .filter((val) => {
                  if (searchProduct === "") {
                    return val;
                  } else if (
                    val.username
                      .toLowerCase()
                      .includes(searchProduct.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, index) => (
                  <>
                    <div style={{ marginBottom: 10 }}></div>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "#F0F8FF",
                          textAlign: "center",
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            display: "grid",
                            marginLeft: 30
                          }}
                        >
                          <table cellpadding="10">
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.roles.length > 0
                                ? item.roles.map((item) => (
                                    <tr>
                                      <td>{item.title}</td>
                                      <td>{item.description}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </td>
                        <td>{item.username}</td>
                        <td>{item.fullname}</td>
                        <td>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))
            : null}
        </table>
      </div>
    </div>
  );
}

export default TabData;
