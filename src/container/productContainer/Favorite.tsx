import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import axios from "axios";
function Favorite(props: { productId: number; isAuthenticated: boolean }) {
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<any>(false);
  const [countLiked, setCountLiked] = useState<any>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props?.isAuthenticated) {
          const isLiked = await axiosConfig.get(
            `${process.env.REACT_APP_API_URL}favorite/check/${props?.productId}`
          );
          setIsLiked(isLiked?.data?.status);
        }
        const count = await axios.get(
          `${process.env.REACT_APP_API_URL}favorite/${props?.productId}`
        );
        setCountLiked(count?.data?.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [changeSuccess, props?.isAuthenticated]);
  const handleClickHeart = async () => {
    if (props?.isAuthenticated) {
      if (!isLiked) {
        try {
          await axiosConfig.post(`${process.env.REACT_APP_API_URL}favorite`, {
            productId: props?.productId,
          });
          setChangeSuccess(!changeSuccess);
        } catch (error) {
          console.log(error);
        }
        return;
      }
      try {
        await axiosConfig.delete(
          `${process.env.REACT_APP_API_URL}favorite/${props?.productId}`
        );
        setChangeSuccess(!changeSuccess);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    return;
  };
  return (
    <div onClick={handleClickHeart} className="flex">
      {isLiked ? (
        <AiFillHeart
          style={{
            color: "red",
            width: "38px",
            fontSize: "28px",
          }}
        />
      ) : (
        <AiOutlineHeart
          style={{
            width: "38px",
            fontSize: "28px",
          }}
        />
      )}
      <p>{countLiked}</p>
    </div>
  );
}

export default Favorite;
