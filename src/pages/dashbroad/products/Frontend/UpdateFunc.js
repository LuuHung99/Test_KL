import React from "react";
import { Input, Form, Button, Modal } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateFunc(props) {
  const {
    handleOk,
    handleCancel,
    ChangeBox,
    handleFormSubmitUpdateFrontend,
    editBox,
    editSelected
  } = props;
 
  return (
    <Modal
      visible={editBox}
      title={`Cập nhật chức năng ${editSelected.title}`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={handleFormSubmitUpdateFrontend}
      >
        <Form.Item name="title" label="Tên">
          <Input
            defaultValue={editSelected.title}
          />
        </Form.Item>
        <Form.Item name="url" label="Đường dẫn">
          <Input
            defaultValue={editSelected.url}
          />
        </Form.Item>
        <Form.Item name="author" label="Tác giả">
          <Input
            defaultValue={editSelected.author}
          />
        </Form.Item>

        <Form.Item name="description" label="Miêu tả">
          <TextArea
            rows={4}
            defaultValue={editSelected.description}
          />
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

export default UpdateFunc;
