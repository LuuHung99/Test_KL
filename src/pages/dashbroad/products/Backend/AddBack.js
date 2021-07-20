import React, { useState } from "react";
import { Input, Form, Button, Modal, Select } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddBack(props) {
  const { model, handleCancel, handleOk, handleAddInfor, ChangeBox } = props;
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [http, setHTTP] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeSelectHttp = (value) => {
    setHTTP(value);
  };

  return (
    <Modal
      visible={model}
      title="Thêm chức năng backend"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks">
        <Form.Item
          name="title"
          label="Tên"
          rules={[
            {
              required: true,
              message: "Tên không được để trống!",
            },
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="path"
          label="Đường dẫn"
          rules={[
            {
              required: true,
              message: "Đường dẫn không được để trống!",
            },
          ]}
        >
          <Input value={path} onChange={(e) => setPath(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="http"
          label="Phương thức"
          rules={[
            {
              required: true,
              message: "Phương thức không được để trống!",
            },
          ]}
        >
          <Select
            value={http}
            onChange={handleChangeSelectHttp}
            style={{ textTransform: "uppercase" }}
          >
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
            <Select.Option value="POST">POST</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Miêu tả"
          rules={[
            {
              required: true,
              message: "Miêu tả không được để trống!",
            },
          ]}
        >
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <div className="box_products">
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => handleAddInfor(title, http, description, path)}
          >
            Thêm mới
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddBack;
