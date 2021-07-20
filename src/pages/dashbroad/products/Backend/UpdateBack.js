import React from "react";
import { Input, Form, Button, Modal, Select } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateBack(props) {
  const {
    editBox,
    handleCancel,
    handleOk,
    handleFormSubmitUpdateFrontend,
    ChangeBox,
    editSelected,
  } = props;
  return (
    <div>
      {editBox && (
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
              <Input defaultValue={editSelected.title} />
            </Form.Item>
            <Form.Item name="path" label="Đường dẫn">
              <Input defaultValue={editSelected.locationPath} />
            </Form.Item>
            <Form.Item name="http" label="Phương thức">
              <Select
                defaultValue={editSelected.httpVerb}
                style={{ textTransform: "uppercase" }}
              >
                <Select.Option value="GET">GET</Select.Option>
                <Select.Option value="PUT">PUT</Select.Option>
                <Select.Option value="POST">POST</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Miêu tả">
              <TextArea rows={4} defaultValue={editSelected.description} />
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
      )}
    </div>
  );
}

export default UpdateBack;
