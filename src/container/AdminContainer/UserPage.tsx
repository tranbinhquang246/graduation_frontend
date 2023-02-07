import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { handleError } from "../../service";
import { setLoading } from "../../redux/loading/actions";
import Table from "antd/es/table";
import { Avatar } from "antd";
import { IMAGES } from "../../assets";

interface DataType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export const UserPage: React.FC<Props> = ({ setLoading }) => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [dataSourceHandled, setDataSourceHandled] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataUsers = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}user/all`
        );
        setDataSource(dataUsers?.data);
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
    let handleData: DataType[] = [];
    if (dataSource.length) {
      dataSource.forEach((data: any) => {
        handleData.push({
          id: data.id,
          email: data.email,
          firstName: data.userInfor?.firstName,
          lastName: data.userInfor?.lastName,
          avatar: data.userInfor?.avatar,
        });
      });
      setDataSourceHandled(handleData);
    }
  }, [dataSource]);

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
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => {
        if (record.avatar) {
          return <Avatar shape="square" size="large" src={record.avatar} />;
        }
        return <Avatar shape="square" size="large" src={IMAGES.userImage} />;
      },
    },
    {
      title: "Action",
      render: (text, record) => (
        <span className="text-blue-500">
          <a onClick={() => handleDelete(record)}>Delete</a>
        </span>
      ),
    },
  ];

  console.log(dataSourceHandled);
  return (
    <div className="w-full mt-[56px] p-2 lg:p-5">
      <div className="flex justify-end md:justify-between w-full">
        <p className="hidden md:block">Total: {dataSource.length}</p>
      </div>
      <div className="w-full overflow-scroll">
        {dataSource && (
          <Table columns={columns} dataSource={dataSourceHandled} />
        )}
      </div>
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = () => ({});

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
