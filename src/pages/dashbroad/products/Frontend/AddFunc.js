import React, { useState } from "react";
import { Input, Form, Button, Modal } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddFunc(props) {
  const { handleOk, handleCancel, ChangeBox, handleAddInfor, model } = props;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  return (
    <Modal
      visible={model}
      title="Thêm chức năng frontend"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks">
        <Form.Item name="title" label="Tên">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item name="url" label="Đường dẫn">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Item>
        <Form.Item name="description" label="Miêu tả">
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="author" label="Tác giả">
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Item>

        <div className="box_products">
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => handleAddInfor(title, url, description, author)}
          >
            Thêm
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddFunc;
