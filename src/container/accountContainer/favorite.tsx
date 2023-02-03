import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { setFavorite } from "../../redux/user-infor/action";
import axiosConfig from "../../axiosInterceptor/AxioConfig";
import { CardItem } from "../../components";
import { setLoading } from "../../redux/loading/actions";

export const Favorite: React.FC<Props> = ({
  favorite,
  setFavorite,
  setLoading,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosConfig.get(
          `${process.env.REACT_APP_API_URL}favorite/all`
        );
        setFavorite({ favorite: response?.data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-start w-full">
        <p className="font-medium border-b-2 border-[#1e293b]">
          Favorite Produsts
        </p>
      </div>
      {/* Favorite này có khả năng lỗi xảy ra với .length */}
      {favorite?.length ? (
        <div
          className="grid w-full gap-x-3 gap-y-5 justify-items-center mt-2"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          }}
        >
          {favorite.map((element: any, index) => {
            return <CardItem data={element?.product} key={index} />;
          })}
        </div>
      ) : (
        <div>Nothing</div>
      )}
    </>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    favorite: state.userInforReducer.favorite,
  };
};

const mapDispatchToProps = { setFavorite, setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
