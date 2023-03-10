import { Button, InputNumber, Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiMinus } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import "./index.css";
import { IMAGES } from "../../assets";
import { RootState } from "../../redux/store";
import { addCartRequest } from "../../redux/cart/actions";
import Favorite from "./Favorite";
import EvaluationProduct from "./EvaluationProduct";
import SlideShow from "./SlideShow";
import { setLoading } from "../../redux/loading/actions";
import { toast } from "react-toastify";
import { CardItem } from "../../components";
import { setAddEvaluationSuccess } from "../../redux/evaluation/actions";

const ProductDetail: React.FC<Props> = ({
  loading,
  cartId,
  addCartRequest,
  isAuthenticated,
  setLoading,
  setAddEvaluationSuccess,
  addEvaluation,
}) => {
  const [dataProduct, setDataProduct] = useState<any>();
  const [ratingProduct, setRatingProduct] = useState<any>();
  const [dataProductRecommend, setDataProductRecommend] = useState<any>();
  const [quantityOrder, setQuantityOrder] = useState<any>(1);
  const location = useLocation();
  const idProduct = location.pathname.replace("/product/", "");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products/${idProduct}`
        );
        setDataProduct(response);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    if (location) {
      fetchData();
      return;
    }
    return;
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products/rating/${idProduct}`
        );
        setRatingProduct(response?.data?.rating);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addEvaluation]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}products/recommend/${dataProduct?.data?.name}`
        );
        setDataProductRecommend(response?.data);
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    };
    if (dataProduct?.data) {
      fetchData();
      return;
    }
    return;
  }, [dataProduct]);
  const onChange = (value: any) => {
    setQuantityOrder(value);
  };

  const handleAddtoCart = () => {
    if (isAuthenticated) {
      addCartRequest({
        cartId: cartId,
        productId: dataProduct?.data.id,
        quantity: quantityOrder,
      });
      return;
    }
    navigate("/login");
  };
  if (dataProduct?.data) {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col md:flex-row w-full mt-[56px]">
          <div className="w-full md:w-1/2 min-h-[550px] justify-center items-center">
            <SlideShow
              data={[dataProduct?.data.mainImg, ...dataProduct?.data.subImg]}
            />
          </div>
          <div className="flex flex-col justify-start w-full md:w-1/2 min-h-[550px] p-5">
            <p className="font-bold text-xl mt-1">{dataProduct?.data?.name}</p>
            <Rate allowHalf disabled value={ratingProduct} className="mb-2" />
            {dataProduct?.data?.salePrice === dataProduct?.data?.price ? (
              <div className="h-[0px]" />
            ) : (
              <del className="font-light text-sm">{`${dataProduct?.data?.price.toLocaleString(
                "vi-VN"
              )} ??`}</del>
            )}
            <p className="font-medium text-lg">{`${dataProduct?.data?.salePrice.toLocaleString(
              "vi-VN"
            )} ??`}</p>

            <Favorite
              productId={dataProduct?.data?.id}
              isAuthenticated={isAuthenticated}
            />
            <p className="mt-5 font-normal text-base">Product Detail</p>
            <div className="flex flex-col w-full p-2">
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Type
                </div>
                <div className="w-4/5 text-sm">{dataProduct?.data?.type}</div>
              </div>
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Design
                </div>
                <div className="w-4/5 text-sm">{dataProduct?.data?.design}</div>
              </div>
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Brand
                </div>
                <div className="w-4/5 text-sm">{dataProduct?.data?.brand}</div>
              </div>
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Material
                </div>
                <div className="w-4/5 text-sm">
                  {dataProduct?.data?.material}
                </div>
              </div>
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Color
                </div>
                <div className="w-4/5 text-sm">{dataProduct?.data?.color}</div>
              </div>
              <div className="flex w-full border-b-2 p-1 mb-1">
                <div className="w-1/5 min-w-[120px] opacity-70 text-sm">
                  Description
                </div>
                <div className="w-4/5 text-sm">
                  {dataProduct?.data?.descriptions}
                </div>
              </div>
            </div>
            <div className="flex w-full">
              {quantityOrder <= 1 ? (
                <Button
                  className="add-button"
                  type="default"
                  disabled
                  icon={<BiMinus />}
                  onClick={() => {
                    setQuantityOrder(quantityOrder - 1);
                  }}
                />
              ) : (
                <Button
                  className="add-button"
                  type="default"
                  icon={<BiMinus />}
                  onClick={() => {
                    setQuantityOrder(quantityOrder - 1);
                  }}
                />
              )}

              <InputNumber
                className="w-1/3 min-w-[80px] max-w-[120px] text-center"
                placeholder="Quantity"
                size={"large"}
                min={1}
                max={dataProduct?.data?.quantity}
                value={quantityOrder}
                onChange={onChange}
              />
              {dataProduct?.data?.quantity === quantityOrder ? (
                <Button
                  className="add-button"
                  type="default"
                  disabled
                  icon={<IoIosAdd />}
                  onClick={() => {
                    setQuantityOrder(quantityOrder + 1);
                  }}
                />
              ) : (
                <Button
                  className="add-button"
                  type="default"
                  icon={<IoIosAdd />}
                  onClick={() => {
                    setQuantityOrder(quantityOrder + 1);
                  }}
                />
              )}
            </div>
            <div className="flex w-full justify-center mt-2">
              {dataProduct?.data?.quantity === 0 ? (
                <p className="text-red-500 font-bold text-sm w-full bg-slate-300 text-center p-2">
                  Sold Out
                </p>
              ) : (
                <Button
                  className="w-1/5 min-w-[120px] max-w-[150px]"
                  onClick={handleAddtoCart}
                  loading={loading}
                >
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
        <EvaluationProduct
          productId={idProduct}
          isAuthenticated={isAuthenticated}
          setAddEvaluationSuccess={setAddEvaluationSuccess}
        />
        <div className="p-5">
          <p className="font-medium text-lg border-b-2 w-1/5 border-slate-800">
            Recommended for you
          </p>
          <div
            className="relative z-1 p-10 grid w-full gap-x-3 gap-y-5 justify-items-center"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            }}
          >
            {dataProductRecommend?.map((element: any, index: number) => {
              return <CardItem data={element} key={index} />;
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full h-full items-center justify-center mt-[56px]">
      <img src={IMAGES.noProductFound} alt="nofound" className=""></img>
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    cartId: state.cartReducer.cartId,
    loading: state.cartReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
    addEvaluation: state.evaluationReducer.addEvaluation,
  };
};

const mapDispatchToProps = {
  addCartRequest,
  setLoading,
  setAddEvaluationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
