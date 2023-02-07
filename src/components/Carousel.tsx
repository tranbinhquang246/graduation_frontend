import React from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import "./styles/carousel.css";

const CarouselComponent = (props: any) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
      <Carousel autoplay className="w-full h-full">
        {props?.data.map((each: any, index: number) => (
          <img src={each} key={index} alt="imgslider"></img>
        ))}
      </Carousel>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselComponent);
