import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { DeliveryCartComponent } from "../../components";
import { setDeliveryAddress } from "../../redux/user-infor/action";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { setLoading } from "../../redux/loading/actions";
import { ModalAddDelivery } from "../modalContainer";
import { handleError } from "../../service";
import { toast } from "react-toastify";

export const EditAddressDelivery: React.FC<Props> = ({
  deliveryAddress,
  setDeliveryAddress,
  setLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [handleAddressSuccess, setHandleAddressSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}address-delivery`
        );
        setDeliveryAddress({ deliveryAddress: response?.data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [handleAddressSuccess]);

  const onCreate = async (values: any) => {
    setLoading(true);
    try {
      await axiosConfig.post(
        `${process.env.REACT_APP_API_URL}address-delivery`,
        values
      );
    } catch (error) {
      handleError(error);
    } finally {
      setHandleAddressSuccess(!handleAddressSuccess);
      setOpenModal(false);
    }
  };
  return (
    <div className="w-full md:mt-0 mt-10">
      <div className="flex justify-end sm:justify-between w-full">
        <p className="hidden sm:block font-medium border-b-2 border-[#1e293b]">
          Delivery Address
        </p>
        <button
          className="text-xs border-2 p-2 rounded-sm border-[#1e293b] hover:text-white hover:bg-[#1e293b]"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add new address
        </button>
      </div>
      {deliveryAddress?.length ? (
        <>
          {deliveryAddress.map((element, index) => {
            return (
              <DeliveryCartComponent
                data={element}
                key={index}
                handleAddressSuccess={handleAddressSuccess}
                setHandleAddressSuccess={setHandleAddressSuccess}
                setLoading={setLoading}
              />
            );
          })}
        </>
      ) : (
        <p>Nothing</p>
      )}
      <ModalAddDelivery
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
const mapStateToProps = (state: RootState) => {
  return {
    deliveryAddress: state.userInforReducer.deliveryAddress,
  };
};

const mapDispatchToProps = {
  setDeliveryAddress,
  setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAddressDelivery);
