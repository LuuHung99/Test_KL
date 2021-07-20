import React from "react";
import { Input, Select, Form, Modal, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateUser(props) {
  const {
    editBox,
    editSelected,
    handleCancel,
    handleOk,
    handleFormSubmitUpdateUser,
    fileList,
    onChangeUpLoad,
    onPreview,
    handleChangeRole,
    dataRole,
    role,
    ChangeBox
  } = props;
  return (
    <Modal
      visible={editBox}
      title={`Cập nhật người dùng ${editSelected.username}`}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={handleFormSubmitUpdateUser}
      >
        <Form.Item name="image" label="Hình ảnh">
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChangeUpLoad}
              onPreview={onPreview}
              defaultFileList={editSelected?.avatarUrl}
            >
              {fileList.length < 1}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item name="username" label="Họ tên">
          <Input defaultValue={editSelected.username} />
        </Form.Item>
        <Form.Item name="fullname" label="Tên tài khoản">
          <Input defaultValue={editSelected.fullname} />
        </Form.Item>
        <Form.Item name="roles" label="Quyền truy cập">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Thêm quyền ..."
            onChange={handleChangeRole}
            options={dataRole}
            value={role}
            defaultValue={editSelected.roles.map((item) => item.title)}
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

export default UpdateUser;
