import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";
import { RootState } from "../redux/store";
import { setCartID, setQuantityCart } from "../redux/cart/actions";
import { setAuthentication, setDataUser } from "../redux/auth/actions";
import { setLoading } from "../redux/loading/actions";
import {
  setDeliveryAddress,
  setFavorite,
  setUserInfor,
  setUserInforSuccess,
} from "../redux/user-infor/action";
import axiosConfig from "../axiosInterceptor/AxioConfig";
import { decodeJwt, handleError } from "../service";
import checkAuthenticated from "../service/checkAuthentication";

export const MainLayout: React.FC<Props> = ({
  cartId,
  setCartID,
  addCardSuccess,
  removeCardSuccess,
  setAuthentication,
  setLoading,
  setUserInfor,
  isSetUserInforSuccess,
  setDeliveryAddress,
  setFavorite,
  setUserInforSuccess,
  addOrderSuccess,
  setQuantityCart,
  setDataUser,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const decodedJwt = await decodeJwt();
      try {
        setLoading(true);
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}user/${decodedJwt?.id}`
        );
        setDataUser({ dataUser: response?.data });
        setCartID({ cardId: response?.data?.Cart.id });
        setQuantityCart({
          quantity: (response?.data?.Cart.cartDetail).length,
        });
        setDeliveryAddress({
          deliveryAddress: response?.data.addressDeliverys,
        });
        setFavorite({ favorite: response?.data.favorite });
        setAuthentication(true);
      } catch (error) {
        setAuthentication(false);
        setCartID({ cardId: 0 });
      } finally {
        setLoading(false);
        return;
      }
    };
    const authenticated = checkAuthenticated();
    if (authenticated || addOrderSuccess) {
      fetchData();
      return;
    }
  }, [addOrderSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      if (isSetUserInforSuccess) {
        const decodedJwt = await decodeJwt();
        try {
          setLoading(true);
          const response = await axiosConfig.get(
            `${process.env.REACT_APP_API_URL}user-infor/${decodedJwt?.id}`
          );
          setUserInfor({ userInfor: response?.data });
        } catch (error) {
          //   handleError(error);
        } finally {
          setLoading(false);
          setUserInforSuccess(false);
        }
        return;
      }
    };
    fetchData();
  }, [isSetUserInforSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      if (cartId) {
        try {
          const response = await axiosConfig.get(
            `${process.env.REACT_APP_API_URL}cart-detail/${cartId}`
          );
          setQuantityCart({ quantity: (response?.data).length });
        } catch (error) {
          //   handleError(error);
        }
      }
    };
    fetchData();
  }, [addCardSuccess, removeCardSuccess]);
  return (
    <div className="relative flex flex-col w-full h-full font-ubuntu min-w-[375px]">
      <Header />
      <div className="w-full h-full flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: RootState) => {
  return {
    addCardSuccess: state.cartReducer.addCardSuccess,
    removeCardSuccess: state.cartReducer.removeCardSuccess,
    cartId: state.cartReducer.cartId,
    userInfor: state.userInforReducer.userInfor,
    isSetUserInforSuccess: state.userInforReducer.isSetUserInforSuccess,
    addOrderSuccess: state.orderReducer.addOrderSuccess,
    quantityCart: state.cartReducer.quantityCart,
  };
};

const mapDispatchToProps = {
  setCartID,
  setAuthentication,
  setLoading,
  setUserInfor,
  setDeliveryAddress,
  setFavorite,
  setUserInforSuccess,
  setQuantityCart,
  setDataUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
