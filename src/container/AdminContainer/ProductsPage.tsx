/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { ModalAddProduct } from "../modalContainer";
import { setLoading } from "../../redux/loading/actions";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import {
  handleDataforSelect,
  handleDataforTable,
  handleError,
} from "../../service";
import getLockUpData from "../../service/getLockupData";
import { ColumnFilterItem } from "antd/es/table/interface";
import Table from "antd/es/table";
import axiosConfigUploadImage from "../../axiosInterceptor/AxiosUploadImage";

interface LockupData {
  type: ColumnFilterItem[];
  design: ColumnFilterItem[];
  material: ColumnFilterItem[];
  brand: ColumnFilterItem[];
  color: ColumnFilterItem[];
}
interface DataType {
  id: number;
  name: string;
  type: string;
  design: string;
  material: string;
  brand: string;
  color: string;
}
export const ProductsPage: React.FC<Props> = ({ setLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState<any>([]);
  const [lockupDataSource, setLockupDataSource] = useState<any>();
  const [lockupDataHanldedSource, setLockupDataHanldedSource] =
    useState<LockupData>();
  const [lockupDataForSelect, setLockupDataForSelect] = useState<any>();
  const [collumnName, setCollumnName] = useState<any>();
  const [handleCreateProductSuccess, setHanleCreateProductSuccess] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataProducts = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}products`
        );
        const lockupData = await getLockUpData();
        setDataSource(dataProducts?.data);
        setLockupDataSource(lockupData);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
        return;
      }
    };
    fetchData();
  }, [handleCreateProductSuccess]);
  useEffect(() => {
    if (lockupDataSource) {
      setLockupDataHanldedSource(
        handleDataforTable.collumnName(lockupDataSource)
      );
      setLockupDataForSelect(handleDataforSelect.collumnName(lockupDataSource));
    }
  }, [lockupDataSource]);
  useEffect(() => {
    if (lockupDataHanldedSource) {
      const columns: ColumnsType<DataType> = [
        {
          title: "ID",
          dataIndex: "id",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.id - b.id,
        },
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ["descend"],
        },
        {
          title: "Type",
          dataIndex: "type",
          filters: lockupDataHanldedSource?.type,
          onFilter: (value: any, record) => record.type.indexOf(value) === 0,
        },
        {
          title: "Design",
          dataIndex: "design",
          filters: lockupDataHanldedSource?.design,
          onFilter: (value: any, record) => record.type.indexOf(value) === 0,
        },
        {
          title: "Brand",
          dataIndex: "brand",
          filters: lockupDataHanldedSource?.brand,
          onFilter: (value: any, record) => record.type.indexOf(value) === 0,
        },
        {
          title: "Material",
          dataIndex: "material",
          filters: lockupDataHanldedSource?.material,
          onFilter: (value: any, record) => record.type.indexOf(value) === 0,
        },
        {
          title: "Color",
          dataIndex: "color",
          filters: lockupDataHanldedSource?.color,
          onFilter: (value: any, record) => record.type.indexOf(value) === 0,
        },
        {
          title: "Action",
          render: (text, record) => (
            <span className="text-blue-500 flex justify-around">
              <a onClick={() => handleEdit(record)}>Edit</a>
              <a onClick={() => handleDelete(record)}>Delete</a>
            </span>
          ),
        },
      ];
      setCollumnName(columns);
    }
  }, [lockupDataHanldedSource]);

  const onCreate = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("descriptions", values.description);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("salePrice", values.salePrice);
    formData.append("color", values.color);
    formData.append("material", values.material);
    formData.append("design", values.design);
    formData.append("type", values.type);
    formData.append("brand", values.brand);
    formData.append("mainImg", values.mainImg.file);
    await axiosConfigUploadImage({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}products`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async (response) => {
        setOpenModal(false);
        setHanleCreateProductSuccess(!handleCreateProductSuccess);
      })
      .catch((error) => {
        handleError(error);
      });
  };
  const handleEdit = (record: any) => {
    console.log("Editing record: ", record);
  };

  const handleDelete = (record: any) => {
    console.log("Deleting record: ", record);
  };
  return (
    <div className="w-full mt-[56px] p-2 lg:p-5">
      <div className="flex justify-end md:justify-between w-full">
        <p className="hidden md:block">Total: {dataSource.length}</p>
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add new product
        </button>
      </div>
      <div className="w-full overflow-scroll">
        {dataSource && <Table columns={collumnName} dataSource={dataSource} />}
      </div>
      <ModalAddProduct
        open={openModal}
        onCreate={onCreate}
        dataSelect={lockupDataForSelect}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = () => ({});

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
