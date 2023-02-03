import React from "react";
import { Form, Input, Modal, Radio } from "antd";

interface Values {
  province: string;
  district: string;
  commune: string;
  address: string;
}

interface CollectionFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export const ModalAddDelivery: React.FC<CollectionFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new address"
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
          name="province"
          label="Province"
          rules={[
            {
              required: true,
              message: "Please input the province",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="district"
          label="Dictrict"
          rules={[
            {
              required: true,
              message: "Please input the district",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="commune"
          label="Commune"
          rules={[
            {
              required: true,
              message: "Please input the commune",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Input />
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

export default ModalAddDelivery;
