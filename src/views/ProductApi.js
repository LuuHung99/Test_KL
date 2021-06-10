import axios from "axios";
import React, { useState, useEffect } from "react";
import { Select, Form, Input, Button, Checkbox } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function ProductApi() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [product, setProduct] = useState({});
 
  useEffect(() => {
    let res = axios.get("http://localhost:5000/api/root/frontend");
    res
      .then((response) => {
        let r = createCategories(response.data);
        setData(r);
        setSelected(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function createCategories(categories, parentId = null) {
    const categoryList = [];

    let category;
    if (parentId != null) {
      category = categories.filter((cat) => cat.parentId === parentId);
    } else {
      category = categories.filter((cat) => cat.parentId === "");
    }

    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        title: cate.title,
        url: cate.url,
        parentId: cate.parentId,
        description: cate.description,
        author: cate.author,
        activated: cate.activated,
        subs: createCategories(categories, cate._id),
      });
    }

    return categoryList;
  }

  function handleChange(value) {
    setProduct({ ...product, ["parentId"]: value });
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    console.log( values);
    
    if (product ) {
      console.log("product",product);
      let req = axios.post(`http://localhost:5000/api/root/frontend`, product );
      req
        .then(() => {
          console.log("Create successful");
        })
        .catch((error) => {
          console.log("Create failed", error);
        });
    }
    setProduct({product, values});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
    <h1>Api Product</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: "50%" }}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="url"
          name="url"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="Author"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Activated"
          name="Activated"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select>
            <Option value={Boolean(true)}>true</Option>
            <Option value={Boolean(false)}>false</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            defaultValue="danh muc cha"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            {selected.length > 0
              ? selected.map((item, index) => (
                  <Option value={item._id} key={index}>
                    {item.title}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProductApi;
