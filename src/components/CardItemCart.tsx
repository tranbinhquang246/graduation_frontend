import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { BiMinus } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  removeCartDetailRequest,
  updateQuantityRequest,
} from "../redux/cart/actions";

const CartItemCart = (props: any) => {
  const data = props.data;
  const updateQuantityRequest = props.updateQuantityRequest;
  const removeCartDetailRequest = props.removeCartDetailRequest;
  const navigate = useNavigate();

  const onChangeAddQuantity = () => {
    updateQuantityRequest({ id: data?.id, quantity: data?.quantity + 1 });
  };
  const onChangeMinusQuantity = () => {
    updateQuantityRequest({ id: data?.id, quantity: data?.quantity - 1 });
  };
  const handleClickProduct = () => {
    navigate(`/product/${data.productId}`);
  };

  const handleRemoveItem = () => {
    removeCartDetailRequest({ cardDetailId: data?.id });
  };

  return (
    <div className="flex items-center text-xs font-light border-b-[1px] border-slate-300 pt-2 pb-2">
      <div
        className="w-[45%] flex justify-start items-center hover:cursor-pointer"
        onClick={handleClickProduct}
      >
        <img
          src={data?.product.mainImg}
          alt="productImg"
          className="w-[80px] h-[80px]"
        />
        <div className="ml-2">
          <p className="font-medium">{data?.product.name}</p>
          <p className="text-[0.6rem]">{`Color: ${data?.product.color}`}</p>
          <p className="text-[0.6rem]">{`Brand: ${data?.product.brand}`}</p>
        </div>
      </div>
      <div className="md:w-[10%] w-[15%] flex justify-center items-center">{`${data?.product.price.toLocaleString(
        "vi-VN"
      )} đ`}</div>
      <div className="flex md:w-[25%] w-[30%] h-[40px] text-center items-center justify-center">
        {data?.quantity <= 1 ? (
          <Button
            className="add-button"
            type="default"
            disabled
            icon={<BiMinus />}
          />
        ) : (
          <Button
            className="add-button"
            type="default"
            icon={<BiMinus />}
            onClick={onChangeMinusQuantity}
          />
        )}

        <InputNumber
          className="w-[50px] h-[40px] text-center"
          placeholder="Quantity"
          size={"large"}
          min={1}
          max={data?.product?.quantity}
          value={data?.quantity}
          //   onChange={}
        />
        {data?.product?.quantity === data?.quantity ? (
          <Button
            className="add-button"
            type="default"
            disabled
            icon={<IoIosAdd />}
          />
        ) : (
          <Button
            className="add-button"
            type="default"
            icon={<IoIosAdd />}
            onClick={onChangeAddQuantity}
          />
        )}
      </div>
      <div className="md:w-[10%] md:flex w-[0%] hidden justify-center items-center">
        {`${(data?.product.price * data?.quantity).toLocaleString("vi-VN")} đ`}
      </div>
      <div className="w-[10%] text-center">
        <DeleteOutlined onClick={handleRemoveItem} />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { updateQuantityRequest, removeCartDetailRequest };

export default connect(mapStateToProps, mapDispatchToProps)(CartItemCart);
