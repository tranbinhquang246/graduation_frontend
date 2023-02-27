import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { handleError } from "../../service";
import Table, { ColumnsType } from "antd/es/table";
import { Avatar } from "antd";
import { IMAGES } from "../../assets";
import axiosConfigUploadImage from "../../axiosInterceptor/AxiosUploadImage";
import { ModalAddCollection } from "../modalContainer";
import { setLoading } from "../../redux/loading/actions";

interface DataType {
  id: string;
  title: string;
  link: string;
}

export const CollectionUsersPage: React.FC<Props> = ({ setLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState<any>([]);
  const [handleCollectionSuccess, setHanleCollectionSuccess] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataOrders = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}collection-images`
        );
        setDataSource(dataOrders?.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
        return;
      }
    };
    fetchData();
  }, [handleCollectionSuccess]);

  const handleDelete = async (record: any) => {
    setLoading(true);
    try {
      await axiosConfig.delete(
        `${process.env.REACT_APP_API_URL}collection-images/${record.id}`
      );
      setHanleCollectionSuccess(!handleCollectionSuccess);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      return;
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "link",
      key: "link",
      render: (text, record) => {
        if (record.link) {
          return (
            <img
              className="w-[200px] h-[100px]"
              src={record.link}
              alt="bannerimg"
            />
          );
        }
        return <Avatar size="large" src={IMAGES.userImage} />;
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

  const onCreate = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("collection", values.collectionImage.file);
    await axiosConfigUploadImage({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}collection-images`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async (response) => {
        setOpenModal(false);
        setHanleCollectionSuccess(!handleCollectionSuccess);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="w-full p-2 lg:p-5">
      <div className="flex justify-end w-full">
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add new data
        </button>
      </div>
      <div className="w-full overflow-scroll">
        {dataSource && <Table columns={columns} dataSource={dataSource} />}
      </div>
      <ModalAddCollection
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionUsersPage);
