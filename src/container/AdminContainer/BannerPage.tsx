import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLoading } from "../../redux/loading/actions";
import { ModalAddBanner } from "../modalContainer";
import { handleError } from "../../service";
import axiosConfigUploadImage from "../../axiosInterceptor/AxiosUploadImage";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import Table, { ColumnsType } from "antd/es/table";
import { Avatar } from "antd";
import { IMAGES } from "../../assets";

interface DataType {
  id: string;
  content: string;
  link: string;
  url: string;
}

export const BannerPage: React.FC<Props> = ({ setLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState<any>([]);
  const [handleBannerSuccess, setHanleBannerSuccess] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataOrders = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}banner-ads`
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
  }, [handleBannerSuccess]);

  const handleDelete = async (record: any) => {
    setLoading(true);
    try {
      await axiosConfig.delete(
        `${process.env.REACT_APP_API_URL}banner-ads/${record.id}`
      );
      setHanleBannerSuccess(!handleBannerSuccess);
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
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Image",
      dataIndex: "link",
      key: "link",
      render: (text, record) => {
        if (record.link) {
          return (
            <img
              className="w-[100px] h-[50px]"
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
    formData.append("content", values.content);
    formData.append("url", values.url);
    formData.append("banner", values.bannerImage.file);
    console.log(values);
    await axiosConfigUploadImage({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}banner-ads`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async (response) => {
        setOpenModal(false);
        setHanleBannerSuccess(!handleBannerSuccess);
      })
      .catch((error) => {
        handleError(error);
      });
  };
  return (
    <div className="w-full mt-[56px] p-2 lg:p-5">
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
      <ModalAddBanner
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerPage);
