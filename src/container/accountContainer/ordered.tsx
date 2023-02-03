/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { setLoading } from "../../redux/loading/actions";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { setOrdered } from "../../redux/order/actions";
import { OrderedCardComponent } from "../../components";
import { handleError } from "../../service";

export const Ordered: React.FC<Props> = ({ setOrdered, orderDetail }) => {
  const [handleOrderSuccess, setHandleOrderSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}orders`
        );
        setOrdered({ orderedData: response?.data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handleOrderSuccess]);

  const handleCanelOrder = async (idOrder: number) => {
    setLoading(true);
    try {
      await axiosConfig.delete(
        `${process.env.REACT_APP_API_URL}orders/${idOrder}`
      );
    } catch (error) {
      handleError(error);
    } finally {
      setHandleOrderSuccess(!handleOrderSuccess);
    }
  };

  const handleReceivedOrder = async (idOrder: number) => {
    setLoading(true);
    try {
      await axiosConfig.patch(
        `${process.env.REACT_APP_API_URL}orders/${idOrder}`,
        { statusOrder: "delivered" }
      );
    } catch (error) {
      handleError(error);
    } finally {
      setHandleOrderSuccess(!handleOrderSuccess);
    }
  };
  return (
    <div className="w-full md:mt-0 mt-10">
      <div className="flex justify-start w-full">
        <p className="hidden sm:block font-medium border-b-2 border-[#1e293b]">
          Ordered
        </p>
      </div>
      {orderDetail?.length ? (
        <div>
          {orderDetail.map((element: any, index) => {
            return (
              <OrderedCardComponent
                data={element}
                handleCanelOrder={handleCanelOrder}
                handleReceivedOrder={handleReceivedOrder}
                key={index}
              />
            );
          })}
        </div>
      ) : (
        <div>Nothing</div>
      )}
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    orderDetail: state.orderReducer.orderDetail,
  };
};

const mapDispatchToProps = { setLoading, setOrdered };

export default connect(mapStateToProps, mapDispatchToProps)(Ordered);
