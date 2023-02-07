import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { XyzTransition } from "@animxyz/react";
import { CardItem, CarouselComponet } from "../../components";
import { IMAGES } from "../../assets";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./index.css";
import axios from "axios";
import { handleError } from "../../service";
import { setLoading } from "../../redux/loading/actions";

const HomePage: React.FC<Props> = ({ setLoading }) => {
  const styleBackgroundImage: React.CSSProperties = {
    backgroundImage: `url(${IMAGES.backgroundImageProduct})`,
  };
  const navigate = useNavigate();
  const [newestProducts, setNewestProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [imageSlider, setImageSlider] = useState<any>([]);
  const [handeledimageSlider, setHandledImageSlider] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newest = await axios.get(
          `${process.env.REACT_APP_API_URL}products/newest`
        );
        const sale = await axios.get(
          `${process.env.REACT_APP_API_URL}products/sale`
        );
        const banner = await axios.get(
          `${process.env.REACT_APP_API_URL}banner-ads`
        );
        setNewestProducts(newest?.data);
        setSaleProducts(sale?.data);
        setImageSlider(banner?.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let handleData: any[] = [];
    if (imageSlider.length) {
      const spliceArr = imageSlider.slice(2);
      spliceArr.forEach((data: any) => {
        handleData.push(data?.link);
      });
      setHandledImageSlider(handleData);
    }
  }, [imageSlider]);
  console.log(imageSlider);
  return (
    <XyzTransition
      appear
      duration="auto"
      xyz="fade flip-down stagger duration-10 delay-2 ease-out-back"
    >
      <div className="flex flex-col w-full p-3 mt-[56px]">
        <div className="flex w-full h-full max-h-[350px]">
          <div className="flex w-full md:w-2/3 h-full p-2">
            <CarouselComponet data={handeledimageSlider} />
          </div>
          <div className="hidden md:flex md:w-1/3 h-full md:flex-col p-2">
            <img
              className="w-full h-1/2 pb-1"
              src={imageSlider[0]?.link}
              alt="imgslider1"
            ></img>
            <img
              className="w-full h-1/2 pt-1"
              src={imageSlider[1]?.link}
              alt="imgslider2"
            ></img>
          </div>
        </div>
        <div className="flex flex-col w-full rounded-sm mt-5">
          <div className="bg-slate-600 w-full rounded-t-lg p-2 pl-5 text-white">
            <p className="text-lg font-bold">Flash sale</p>
            <p className="text-sm font-light	">
              Hundreds of products catching the latest trends
            </p>
          </div>
          <div className="flex flex-row bg-slate-400 w-full rounded-b-lg p-2 overflow-x-auto scrollbar-hide">
            {saleProducts.map((element, index) => {
              return <CardItem data={element} key={index} />;
            })}
          </div>
        </div>

        <div className="flex flex-col w-full h-full rounded-sm mt-5">
          <div
            className=" relative z-0 w-full h-[320px] p-5 text-white bg-cover backdrop-blur-sm"
            style={styleBackgroundImage}
          >
            <div className="mt-[50px] border-b-2 w-1/2">
              <p className="font-light">NEWEST</p>
              <p className="font-bold text-sm sm:text-lg ">
                NEW PRODUCTS FOR YOU
              </p>
            </div>
          </div>

          <div
            className=" relative z-1 mt-[-80px] grid w-full gap-x-3 gap-y-5 justify-items-center"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            }}
          >
            {newestProducts.map((element, index) => {
              return <CardItem data={element} key={index} />;
            })}
          </div>
          <div className="flex w-full justify-center">
            <Button
              className="w-[150px] bg-slate-200 border-2 border-slate-600 text-slate-600 font-medium mt-3"
              onClick={() => {
                navigate("/products");
              }}
            >
              See more
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full mt-5 p-3">
          <p className="font-medium text-lg bg-slate-800 w-full h-[50px] text-white flex items-center justify-center min-w-[300px]">
            STORE SYSTEM
          </p>
          <div className="flex flex-wrap">
            <img
              src={IMAGES.HANOI}
              alt="HANOI"
              className="w-full md:w-1/2 p-2 min-w-[300px]"
            ></img>
            <div className="flex flex-col w-full md:w-1/2 p-2 justify-center items-center min-w-[300px]">
              <div className="mb-2 w-full pl-5">
                <strong>Address 1: </strong>
                <p>Khương Trung, Thanh Xuân, Hà Nội, Việt Nam</p>
              </div>
              <div className="mb-2 w-full pl-5">
                <strong>Address 2: </strong>
                <p>Hàng Mã, Hoàn Kiếm, Hà Nội, Việt Nam</p>
              </div>
              <div className="mb-2 w-full pl-5">
                <strong>Address 3: </strong>
                <p>Quán Thánh, Ba Đình, Hà Nội, Việt Nam</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap-reverse">
            <div className="flex flex-col w-full md:w-1/2 p-2 justify-center items-center min-w-[300px]">
              <div className="mb-2 w-full">
                <strong>Address 1: </strong>
                <p>
                  Phường Hòa Khánh Bắc, Quận Liên Chiểu, Thành Phố Đà Nẵng, Hoà
                  Minh, Liên Chiểu, Đà Nẵng, Việt Nam
                </p>
              </div>
              <div className="mb-2 w-full">
                <strong>Address 2: </strong>
                <p>Đ. số 9, Hoà Thọ Tây, Cẩm Lệ, Đà Nẵng, Việt Nam</p>
              </div>
              <div className="mb-2 w-full">
                <strong>Address 3: </strong>
                <p>106 Đ. Bình Kỳ, Hoà Quý, Ngũ Hành Sơn, Đà Nẵng, Việt Nam</p>
              </div>
            </div>
            <img
              src={IMAGES.DANANG}
              alt="HANOI"
              className="w-full md:w-1/2 p-2 min-w-[300px]"
            ></img>
          </div>
          <div className="flex flex-wrap">
            <img
              src={IMAGES.TPHCM}
              alt="HANOI"
              className="w-full md:w-1/2 p-2 min-w-[300px]"
            ></img>
            <div className="flex flex-col w-full md:w-1/2 p-2 justify-center items-center min-w-[300px]">
              <div className="mb-2 w-full pl-5">
                <strong>Address 1: </strong>
                <p>Thảo Điền, Quận 2, Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="mb-2 w-full pl-5">
                <strong>Address 2: </strong>
                <p>Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="mb-2 w-full pl-5">
                <strong>Address 3: </strong>
                <p>Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh, Việt Namm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-2 mx-[20px] mt-5 mb-1 text-white font-bold text-lg flex flex-col items-center justify-center">
          <p>LOYAL CUSTOMER</p>
          <p className="font-light text-xs border-b-2 p-2">
            We have loyal and trusted customers. Thanks for your cooperation.
            Let's look back at the memorable moments
          </p>
        </div>
        <Zoom scale={1.4} indicators={true}>
          {handeledimageSlider.map((each: any, index: number) => (
            <div key={index} style={{ width: "100%" }}>
              <img
                style={{ objectFit: "contain", width: "100%" }}
                src={each}
                alt={String(index)}
              />
            </div>
          ))}
        </Zoom>
      </div>
    </XyzTransition>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = () => ({});

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
