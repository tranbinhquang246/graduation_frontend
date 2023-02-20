import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLoading } from "../../redux/loading/actions";
import { handleError } from "../../service";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  dateOrder: string;
  deliveryAddress: string;
  status: string;
  totalOrder: number;
  quantity: number;
}

export const OrdersPage: React.FC<Props> = ({ setLoading }) => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [dataSourceHandled, setDataSourceHandled] = useState<any>([]);
  const [handleUpdateOrderSuccess, setHandleUpdateOrderSuccess] =
    useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dataOrders = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}orders/all`
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
  }, [handleUpdateOrderSuccess]);

  useEffect(() => {
    let handleData: DataType[] = [];
    if (dataSource.length) {
      dataSource.forEach((data: any) => {
        handleData.push({
          id: data.id,
          dateOrder: data.dateOrder,
          deliveryAddress: data.deliveryAddress,
          status: data.statusOrder,
          totalOrder: data.totalOrder,
          quantity: data.orderDetail.length,
        });
      });
      setDataSourceHandled(handleData);
    }
  }, [dataSource]);

  const handleDeliveredOrder = async (record: any) => {
    setLoading(true);
    try {
      await axiosConfig.patch(
        `${process.env.REACT_APP_API_URL}orders/${record.id}`,
        { statusOrder: "delivery" }
      );
    } catch (error) {
      handleError(error);
    } finally {
      setHandleUpdateOrderSuccess(!handleUpdateOrderSuccess);
    }
  };
  const handleConfirmOrder = async (record: any) => {
    setLoading(true);
    try {
      await axiosConfig.patch(
        `${process.env.REACT_APP_API_URL}orders/${record.id}`,
        { statusOrder: "confirmed" }
      );
    } catch (error) {
      handleError(error);
    } finally {
      setHandleUpdateOrderSuccess(!handleUpdateOrderSuccess);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Data Order",
      dataIndex: "dateOrder",
      key: "dateOrder",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Order",
      dataIndex: "totalOrder",
      key: "totalOrder",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      render: (text, record) => (
        <span className="text-blue-500 flex flex-col justify-around leading-5">
          <a onClick={() => handleConfirmOrder(record)}>Confirm</a>
          <a onClick={() => handleDeliveredOrder(record)}>Delivery</a>
        </span>
      ),
    },
  ];
  return (
    <div className="w-full p-2 lg:p-5 overflow-y-scroll">
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
