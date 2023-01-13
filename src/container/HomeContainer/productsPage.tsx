import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IMAGES } from "../../assets";
import { XyzTransition } from "@animxyz/react";
import {
  CardItem,
  PaginationComponent,
  SideBarProduct,
} from "../../components";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "antd";
import { handleError } from "../../service";
import { setLoading } from "../../redux/loading/actions";

export const ProductsPage: React.FC<Props> = ({ setLoading }) => {
  const styleBackgroundImage: React.CSSProperties = {
    backgroundImage: `url(${IMAGES.backgroundProduct})`,
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataProducts, setDataProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const searchKeyWord = searchParams.get("search") || "";
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}products/all?type=${
          searchParams.get("type") || ""
        }&design=${searchParams.get("design") || ""}&material=${
          searchParams.get("material") || ""
        }&brand=${searchParams.get("brand") || ""}&color=${
          searchParams.get("color") || ""
        }&page=${searchParams.get("page") || 1}&limit=${
          searchParams.get("limit") || 6
        }&searchWord=${searchParams.get("search") || ""}`
      )
      .then((response) => {
        setDataProducts(response?.data.data);
        setTotalPages(response?.data.totalPage);
        setCurrentPages(response?.data.currentPage);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      if (criteria === "") {
        searchParams.delete("search");
        searchParams.delete("page");
        setSearchParams(searchParams);
        return;
      }
      searchParams.set("search", criteria);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }, 1000)
  ).current;

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  return (
    <XyzTransition
      appear
      duration="auto"
      xyz="fade flip-down stagger duration-10 delay-2 ease-out-back"
    >
      <div className="w-full h-full flex flex-col font-ubuntu">
        <div
          className="flex flex-wrap items-end justify-between relative z-0 w-full h-[420px] p-5 text-white bg-cover backdrop-blur-sm mt-[56px]"
          style={styleBackgroundImage}
        >
          <p className="w-[200px] font-bold text-2xl flex items-end text-white border-b-4 border-white">
            PRODUCTS
          </p>
          <Input
            className="h-[45px] w-[300px]"
            placeholder="input search text"
            allowClear
            defaultValue={searchKeyWord}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex">
          <div className="w-1/5 min-w-[150px]">
            <SideBarProduct />
          </div>
          <div className="flex flex-col w-4/5">
            <div
              className=" relative z-1 p-5 grid w-full gap-x-3 gap-y-5 justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              }}
            >
              {dataProducts.map((element, index) => {
                return <CardItem data={element} key={index} />;
              })}
            </div>
            <div className="w-full flex items-center justify-center">
              <PaginationComponent
                totalPage={totalPages}
                currentPage={currentPages}
              />
            </div>
          </div>
        </div>
      </div>
    </XyzTransition>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = () => ({});

const mapDispatchToProps = { setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
