import React, { useState } from "react";
import { Form, Input, Modal, Upload } from "antd";
import { validateImage } from "../../service";
import { GrFormAdd } from "react-icons/gr";

interface Values {
  bannerImage: any;
  content: string;
  url: string;
}

interface CollectionFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const uploadButton = (
  <div className="flex flex-col justify-center items-center">
    <GrFormAdd />
    <div style={{ marginTop: 8 }}>
      Thêm <br /> hình ảnh
    </div>
  </div>
);

export const ModalAddBanners: React.FC<CollectionFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleChange = (file: any) => setFileList(file?.fileList);
  return (
    <Modal
      open={open}
      title="Create a new banners"
      footer={false}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please input the content",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[
            {
              required: true,
              message: "Please input url",
            },
            { type: "url", message: "URL not valid" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "-5px" }}
          name="bannerImage"
          label="Upload"
          rules={[
            {
              required: true,
              message: "Please, choose a image",
            },
            {
              message: "Please, choose a image file",
              validator: validateImage.validateImage,
            },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
            accept=".png,.jpg,.jpeg"
            showUploadList={{ showPreviewIcon: false }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
      <div className="mt-4 flex items-center justify-end space-x-3">
        <button
          className="border-2 px-3 py-2 rounded-md hover:bg-slate-400 hover:text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="border-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:text-slate-300 hover:bg-blue-600"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default ModalAddBanners;
