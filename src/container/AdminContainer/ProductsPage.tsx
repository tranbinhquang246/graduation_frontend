import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ModalAddProduct } from "../modalContainer";
import { setLoading } from "../../redux/loading/actions";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { handleDataforTable, handleError } from "../../service";
import getLockUpData from "../../service/getLockupData";
import { ColumnFilterItem } from "antd/es/table/interface";
import Table from "antd/es/table";

interface LockupData {
  type: ColumnFilterItem[];
  design: ColumnFilterItem[];
  material: ColumnFilterItem[];
  brand: ColumnFilterItem[];
  color: ColumnFilterItem[];
}
interface DataType {
  key: React.Key;
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
  const [collumnName, setCollumnName] = useState<any>();
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
  }, []);
  useEffect(() => {
    if (lockupDataSource) {
      setLockupDataHanldedSource(
        handleDataforTable.collumnName(lockupDataSource)
      );
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
            <span>
              <a onClick={() => handleEdit(record)}>Edit</a>
              <a onClick={() => handleDelete(record)}>Delete</a>
            </span>
          ),
        },
      ];
      setCollumnName(columns);
    }
  }, [lockupDataHanldedSource]);

  const onCreate = (values: any) => {
    console.log(values);
  };
  const handleEdit = (record: any) => {
    console.log("Editing record: ", record);
  };

  const handleDelete = (record: any) => {
    console.log("Deleting record: ", record);
  };
  return (
    <div className="w-full overflow-scroll mt-[56px] p-2 lg:p-5">
      <div className="flex justify-start w-full">
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add new address
        </button>
      </div>
      {dataSource && <Table columns={collumnName} dataSource={dataSource} />}

      <ModalAddProduct
        open={openModal}
        onCreate={onCreate}
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
