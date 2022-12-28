import React from "react";
import { connect } from "react-redux";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineAmazon } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export const FooterSection = () => {
  return (
    <div className="flex flex-wrap w-full p-5 bg-slate-200 text-slate-800">
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-xs w-3/4 mb-1 border-b-[1px] border-b-slate-600">
          Services
        </p>
        <p className="font-light text-xs">Free eye exam</p>
        <p className="font-light text-xs">Renewed</p>
        <p className="font-light text-xs">Free cleaning</p>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-xs w-3/4 mb-1 border-b-[1px] border-b-slate-600">
          Policy
        </p>
        <p className="font-light text-xs">Payment</p>
        <p className="font-light text-xs">Delivery</p>
        <p className="font-light text-xs">Insurance</p>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-xs w-3/4 mb-1 border-b-[1px] border-b-slate-600">
          Contact
        </p>
        <p className="font-light text-xs">Email: a@gmail.com</p>
        <p className="font-light text-xs">Phone: 0123456789</p>
        <div className="flex  justify-around w-2/3">
          <BsFacebook />
          <BsInstagram />
          <AiOutlineAmazon />
          <FaTiktok />
        </div>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-xs w-3/4 mb-1 border-b-[1px] border-b-slate-600">
          About Me
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FooterSection);
