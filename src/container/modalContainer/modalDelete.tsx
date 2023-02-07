import React from "react";
import { Modal } from "antd";
interface CollectionFormProps {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export const ModalDelete: React.FC<CollectionFormProps> = ({
  open,
  onDelete,
  onCancel,
}) => {
  return (
    <Modal open={open} footer={false} onCancel={onCancel}>
      <div className="relative bg-white px-4 pt-6 pb-8 sm:pt-8 sm:pb-4 sm:px-8 sm:py-8">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete
          </h3>
        </div>
        <div className="mt-4 bg-red-200 p-2">
          <div className="text-sm leading-5 text-gray-500">
            Are you sure you want to delete? This action cannot be undone.
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            className="border-2 px-3 py-2 rounded-md hover:bg-slate-400 hover:text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="border-2 bg-red-500 text-white px-3 py-2 rounded-md hover:text-slate-300 hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
