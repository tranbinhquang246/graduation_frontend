import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select, Upload, UploadFile } from "antd";
import { validateImage } from "../../service";
import { GrFormAdd } from "react-icons/gr";
import TextArea from "antd/es/input/TextArea";

interface Values {
  name: string;
  description: string;
  quantity: number;
  price: number;
  salePrice: number;
  color: string;
  material: string;
  design: string;
  type: string;
  brand: string;
  mainImg: any;
}

interface CollectionFormProps {
  open: boolean;
  dataSelect: { brand: []; color: []; material: []; design: []; type: [] };
  initData: any;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const uploadButton = (
  <div className="flex flex-col justify-center items-center">
    <GrFormAdd />
    <div style={{ marginTop: 8 }}>
      Add <br /> image
    </div>
  </div>
);

export const ModalEditProduct: React.FC<CollectionFormProps> = ({
  open,
  dataSelect,
  initData,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "mainImg",
      url: initData?.mainImg,
    },
  ]);
  const handleChange = (file: any) => setFileList(file?.fileList);
  const initialValue = {
    name: initData?.name,
    quantity: initData?.quantity,
    price: initData?.price,
    salePrice: initData?.salePrice,
    color: initData?.color,
    material: initData?.material,
    design: initData?.design,
    type: initData?.type,
    brand: initData?.brand,
    description: initData?.description,
  };
  return (
    <Modal
      open={open}
      title="Create a new product"
      footer={false}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValue}
      >
        <Form.Item
          name="name"
          label="Name"
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
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
              message: "Please input the commune",
            },
          ]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item
          name="salePrice"
          label="Sale Price"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Input type="number" min="0" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          rules={[
            {
              required: true,
              message: "Please select color",
            },
          ]}
        >
          <Select options={dataSelect?.color} />
        </Form.Item>
        <Form.Item
          name="material"
          label="Material"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Select options={dataSelect?.material} />
        </Form.Item>
        <Form.Item
          name="design"
          label="Design"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Select options={dataSelect?.design} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Select options={dataSelect?.type} />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
              message: "Please input the address",
            },
          ]}
        >
          <Select options={dataSelect?.brand} />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "-5px" }}
          label="Mô tả"
          name="description"
        >
          <TextArea rows={4} maxLength={500} />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "-5px" }}
          name="mainImg"
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
                form.resetFields();
                onCreate(info.values);
              });
          }}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default ModalEditProduct;
