import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import checkAuthenticated from "../../service/checkAuthentication";
import { decodeJwt, handleError } from "../../service";
import { CardItemCartComponent } from "../../components";
import { IMAGES } from "../../assets";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/loading/actions";
import Loading from "../../components/Loading";

const CartPage: React.FC<Props> = ({
  updateQuantitySuccess,
  removeCardSuccess,
  setLoading,
}) => {
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSalePrice, setTotalSalePrice] = useState<number>(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>(0);
  const [totalAmountPorduct, setTotalAmountPorduct] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const decodedJwt = await decodeJwt();
      try {
        setLoading(true);
        await axiosConfig
          .get(`${process.env.REACT_APP_API_URL}cart/${decodedJwt?.id}`)
          .then((response) => {
            setDataCart(response?.data[0]?.cartDetail);
          });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    const authenticated = checkAuthenticated();
    if (authenticated) {
      fetchData();
      return;
    }
  }, [updateQuantitySuccess, removeCardSuccess]);
  useEffect(() => {
    let provisionalCalcPrice = 0;
    let provisionalCalcSalePrice = 0;
    let amoutProducts = 0;
    dataCart.map((element: any) => {
      provisionalCalcPrice =
        provisionalCalcPrice + element.quantity * element.product.price;
      provisionalCalcSalePrice =
        provisionalCalcSalePrice + element.quantity * element.product.salePrice;
      amoutProducts = amoutProducts + element.quantity;
    });
    setTotalPrice(provisionalCalcPrice);
    setTotalSalePrice(provisionalCalcSalePrice);
    setTotalDiscountPrice(provisionalCalcPrice - provisionalCalcSalePrice);
    setTotalAmountPorduct(amoutProducts);
  }, [dataCart]);

  return (
    <div className="w-full flex flex-col mt-[56px]">
      <Loading />
      {dataCart.length ? (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          <div className="flex flex-col w-full lg:w-2/3 p-3">
            <div className="flex bg-slate-100 text-sm font-medium py-4 border-b-[1px] border-slate-300">
              <div className="w-[45%] text-left">Products</div>
              <div className="md:w-[10%] w-[15%] text-center">Price</div>
              <div className="md:w-[25%] w-[30%] text-center">Quantity</div>
              <div className="md:w-[10%] md:flex w-[0%] hidden md:text-center justify-center">
                Total
              </div>
              <div className="w-[10%] text-center">Action</div>
            </div>
            {dataCart.map((element, index) => {
              return <CardItemCartComponent data={element} key={index} />;
            })}
          </div>
          <div className="flex flex-col w-full lg:w-1/3 p-3">
            <div className="flex justify-center bg-slate-100 text-sm font-medium p-4 border-b-[1px] border-slate-300">
              Payment information
            </div>
            <div className="flex justify-between  text-sm font-normal px-2 py-4 border-b-[1px] border-slate-300">
              <p>Estimate Total</p>
              <p className="font-medium">{`${totalPrice?.toLocaleString(
                "vi-VN"
              )} đ`}</p>
            </div>
            <div className="flex justify-between  text-sm font-normal px-2 py-4 border-b-[1px] border-slate-300">
              <p>Amount</p>
              <p className="font-medium">{totalAmountPorduct}</p>
            </div>
            <div className="flex justify-between  text-sm font-normal px-2 py-4 border-b-[1px] border-slate-300">
              <p>Discount</p>
              <p className="font-medium">{`${totalDiscountPrice?.toLocaleString(
                "vi-VN"
              )} đ`}</p>
            </div>
            <div className="flex justify-between  text-sm font-normal px-2 py-4 border-b-[1px] border-slate-300">
              <p>Total</p>
              <p className="font-medium">{`${totalSalePrice?.toLocaleString(
                "vi-VN"
              )} đ`}</p>
            </div>
            <div className="flex justify-center  px-2 py-4 border-slate-300">
              <Button className="w-[120px] h-[50px] font-medium text-base text-white border-2 border-blue-800 bg-blue-800 hover:bg-white hover:text-blue-800">
                Payment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-screen p-3 ">
          <img src={IMAGES.emptyCart} alt="emptycart" className="h-2/3" />
          <Button
            className="w-[150px] bg-slate-200 border-2 h-[45px] border-slate-600 text-slate-600 font-medium mt-3"
            onClick={() => {
              navigate("/products");
            }}
          >
            Shopping now
          </Button>
        </div>
      )}

      <div
        className="bg-slate-900
	  "
      >
        Recommend
      </div>
    </div>
  );
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    updateQuantitySuccess: state.cartReducer.updateQuantity,
    removeCardSuccess: state.cartReducer.removeCardSuccess,
  };
};

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
