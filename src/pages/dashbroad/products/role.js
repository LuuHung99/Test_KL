import React, { useState } from "react";
import { Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

function TabData(props) {
  const [dataPd] = useState(window.store.datarole);
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Role</h1>
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
              <th style={{ paddingLeft: 180 }}>Frontends</th>
              <th style={{ paddingLeft: 180 }}>Backends</th>
              <th>Title</th>
              <th>Description</th>
              <th>Activated</th>
            </tr>
          </thead>
          {dataPd.length > 0
            ? dataPd
                .map((item, index) => (
                  <>
                    <div style={{ marginBottom: 10 }}></div>
                    <tbody>
                      <tr
                        style={{ backgroundColor: "#F0F8FF", width: "100%" }}
                        key={index}
                      >
                        <td>
                          <table cellpadding="10">
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>Title</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.backends.length > 0
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
                                      <tr style={{ paddingBottom: 10 }}>
                                        <td style={{ paddingLeft: 30 }}>
                                          {item.title}
                                        </td>
                                        <td style={{ paddingLeft: 30 }}>
                                          {item.description}
                                        </td>
                                      </tr>
                                    ))
                                : null}
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <table style={{ marginLeft: 5 }} cellpadding="10">
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>Title</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.backends.length > 0
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
                                      <tr style={{ paddingLeft: 20 }}>
                                        <td style={{ paddingLeft: 30 }}>
                                          {item.title}
                                        </td>
                                        <td style={{ paddingLeft: 30 }}>
                                          {item.description}
                                        </td>
                                      </tr>
                                    ))
                                : null}
                            </tbody>
                          </table>
                        </td>
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
