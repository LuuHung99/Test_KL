import React, { useState } from "react";
import { Input, Form, Button, Modal } from "antd";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateActive(props) {
  const [reason, setReason] = useState("");
  const {
    itemSelected,
    handleOk,
    handleCancel,
    ChangeBox,
    visible,
    handleClickActive,
  } = props;
  return (
    <Modal
      visible={visible}
      title={`${itemSelected.activated ? "Kích hoạt" : "Vô hiệu hóa"} ${
        itemSelected.title
      }`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks" >
        <h2 style={{marginLeft: 50}}>Lý do</h2>
        <Form.Item
          name="reason"
          rules={[
            {
              required: true,
              message: "Lý do không được để trống!",
            },
          ]}
          style={{ marginRight: -150, marginLeft: 50 }}
        >
          <TextArea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Item>
        <div className="box_products">
          <Button
            key="submit"
            type={itemSelected.activated ? "ghost" : "primary"}
            htmlType="submit"
            onClick={() =>
              handleClickActive(
                itemSelected._id,
                itemSelected.activated,
                itemSelected.author,
                itemSelected.username,
                reason
              )
            }
          >
            {itemSelected.activated ? "Vô hiệu hóa" : "Kích hoạt"}
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateActive;