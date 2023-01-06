import React from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import "./carousel.css";

const CarouselComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
      <Carousel autoplay className="w-full h-full">
        <img src="https://plus.unsplash.com/premium_photo-1664361480105-33afc4559c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=923&q=80"></img>
        <img src="https://plus.unsplash.com/premium_photo-1664361480105-33afc4559c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=923&q=80"></img>
        <img src="https://plus.unsplash.com/premium_photo-1664361480105-33afc4559c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=923&q=80"></img>
        <img src="https://plus.unsplash.com/premium_photo-1664361480105-33afc4559c40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=923&q=80"></img>
      </Carousel>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselComponent);
