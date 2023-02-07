import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import getLockUpData from "../../service/getLockupData";
import { handleError } from "../../service";
import { setLoading } from "../../redux/loading/actions";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  name: string;
  createdAt: string;
}

export const LockupDataPage: React.FC<Props> = ({ setLoading }) => {
  const [dataSource, setDataSource] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const lockupData = await getLockUpData();
        setDataSource(lockupData);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
        return;
      }
    };
    fetchData();
  }, []);

  const handleDelete = (record: any) => {
    console.log("Deleting record: ", record);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      render: (text, record) => (
        <span className="text-blue-500 flex flex-col justify-around leading-5">
          <a onClick={() => handleDelete(record)}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full mt-[56px] p-2 lg:p-5">
      <div className="flex justify-end w-full">
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={() => {}}
        >
          Add new data
        </button>
      </div>
      {dataSource && (
        <div className="w-full overflow-scroll">
          <div className="w-full">
            <p className="text-center">Brand</p>
            <Table columns={columns} dataSource={dataSource?.brand} />
          </div>

          <div className="w-full">
            <p className="text-center">Type</p>
            <Table columns={columns} dataSource={dataSource?.type} />
          </div>

          <div className="w-full">
            <p className="text-center">Design</p>
            <Table columns={columns} dataSource={dataSource?.design} />
          </div>

          <div className="w-full">
            <p className="text-center">Material</p>
            <Table columns={columns} dataSource={dataSource?.material} />
          </div>
          <div className="w-full">
            <p className="text-center">Color</p>
            <Table columns={columns} dataSource={dataSource?.color} />
          </div>
        </div>
      )}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = () => ({});

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(LockupDataPage);
