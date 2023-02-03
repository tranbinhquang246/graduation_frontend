import React, { useState } from "react";
import { Modal, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
interface CollectionFormProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  data: any;
  setIndexRadioChoose: React.Dispatch<any>;
  indexRadioChoose: any;
}

export const ModalChangeDeliveryAddress: React.FC<CollectionFormProps> = ({
  open,
  onOk,
  onCancel,
  data,
  setIndexRadioChoose,
  indexRadioChoose,
}) => {
  const onChange = (e: RadioChangeEvent) => {
    setIndexRadioChoose(e.target.value);
  };
  return (
    <Modal
      open={open}
      title="Change Delivery Address"
      footer={false}
      onCancel={onCancel}
    >
      <div className="relative bg-white px-4 pb-8 sm:pb-4 sm:px-8 ">
        <div className="mt-4">
          <h3 className="text-sm leading-6 font-medium text-gray-900">
            Choose one
          </h3>
        </div>
        <div className="mt-1 p-2">
          <Radio.Group onChange={onChange} value={indexRadioChoose}>
            <Space direction="vertical">
              {data?.map((element: any, index: number) => {
                return (
                  <Radio
                    key={index}
                    value={index}
                  >{`${element?.address}, ${element?.commune}, ${element?.district}, ${element?.province}`}</Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            className="border-2 px-3 py-2 rounded-md hover:bg-slate-400 hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="border-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:text-slate-300 hover:bg-blue-600"
            onClick={onOk}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangeDeliveryAddress;
