import React from "react";
import { connect } from "react-redux";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineAmazon } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export const FooterSection = () => {
  return (
    <div className="flex flex-wrap w-full p-5 bg-[#001529] text-slate-100">
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-sm w-3/4 mb-1 border-b-[1px] border-b-slate-400">
          Services
        </p>
        <p className="font-light text-sm">Free eye exam</p>
        <p className="font-light text-sm">Renewed</p>
        <p className="font-light text-sm">Free cleaning</p>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-sm w-3/4 mb-1 border-b-[1px] border-b-slate-400">
          Policy
        </p>
        <p className="font-light text-sm">Payment</p>
        <p className="font-light text-sm">Delivery</p>
        <p className="font-light text-sm">Insurance</p>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-sm w-3/4 mb-1 border-b-[1px] border-b-slate-400">
          Contact
        </p>
        <p className="font-light text-sm">Email: a@gmail.com</p>
        <p className="font-light text-sm">Phone: 0123456789</p>
        <div className="flex  justify-around w-2/3">
          <BsFacebook />
          <BsInstagram />
          <AiOutlineAmazon />
          <FaTiktok />
        </div>
      </div>
      <div className="w-1/4 min-w-[186px] mb-2">
        <p className="font-medium text-sm w-3/4 mb-1 border-b-[1px] border-b-slate-400">
          About Me
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FooterSection);
