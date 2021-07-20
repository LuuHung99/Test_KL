import React from "react";
import { Input, Form, Button, Modal, Select } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateRole(props) {
  const {
    editBox,
    editSelected,
    handleCancel,
    handleOk,
    handleFormSubmitUPdateRole,
    ChangeBox,
    handleChangeFrontend,
    handleChangeBackend,
    dataFrontend,
    dataBackend
  } = props;
  return (
    <Modal
      visible={editBox}
      title={`Cập nhật quyền ${editSelected.title}`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={handleFormSubmitUPdateRole}
      >
        <Form.Item name="title" label="Tên">
          <Input defaultValue={editSelected.title} />
        </Form.Item>
        <Form.Item name="description" label="Miêu tả">
          <TextArea rows={4} defaultValue={editSelected.description} />
        </Form.Item>

        <Form.Item name="tabs" label="Frontend">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            onChange={handleChangeFrontend}
            options={dataFrontend}
            defaultValue={editSelected.tabs.map((item) => item.title)}
          ></Select>
        </Form.Item>

        <Form.Item name="backends" label="Backend">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            onChange={handleChangeBackend}
            options={dataBackend}
            defaultValue={editSelected.backends.map((item) => item.title)}
          ></Select>
        </Form.Item>

        <div className="box_products">
          <Button key="submit" type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateRole;
