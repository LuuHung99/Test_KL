import React, { useState } from "react";
import { Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

function TabData(props) {
  const [dataPd] = useState(window.store.dataresource);
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Backend</h1>
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
              <th>LocationPath</th>
              <th>HttpVerb</th>
              <th>Description</th>
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
                        >
                          <td>{item.title}</td>
                          <td>{item.locationPath}</td>
                          <td>{item.httpVerb}</td>
                          <td>{item.description}</td>
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
                  ) : null
                )
            : null}
        </table>
      </div>
    </div>
  );
}

export default TabData;
