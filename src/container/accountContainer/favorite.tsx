import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { setFavorite } from "../../redux/user-infor/action";

export const Favorite: React.FC<Props> = ({ favorite, setFavorite }) => {
  useEffect(() => {}, []);
  console.log(favorite);
  return <div>favorite</div>;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: RootState) => {
  return {
    favorite: state.userInforReducer.favorite,
  };
};

const mapDispatchToProps = { setFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
