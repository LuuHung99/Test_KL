import React, { useState } from "react";
import { Input, Form, Button, Modal, Select } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddRole(props) {
  const {
    model,
    handleCancel,
    handleOk,
    handleFormSubmitAddRole,
    handleChangeFrontend,
    handleChangeBackend,
    handleAddInfor,
    ChangeBox,
    frontend,
    backend,
    dataFrontend,
    dataBackend,
  } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      visible={model}
      title="Thêm quyền truy cập"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks" onFinish={handleFormSubmitAddRole}>
        <Form.Item name="title" label="Tên">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item name="description" label="Miêu tả">
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="tab" label="Frontend">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Tag frontend"
            onChange={handleChangeFrontend}
            options={dataFrontend}
            value={frontend}
          ></Select>
        </Form.Item>

        <Form.Item name="backend" label="Backend">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Tag backend"
            onChange={handleChangeBackend}
            options={dataBackend}
            value={backend}
          ></Select>
        </Form.Item>

        <div className="box_products">
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() =>
              handleAddInfor(title, description, frontend, backend)
            }
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

export default AddRole;
