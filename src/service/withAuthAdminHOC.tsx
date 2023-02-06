import React, { useEffect, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkAuthenticated from "./checkAuthentication";
import decodeJwt from "./decodeJwt";
import LoadingLayout from "../layout/LoadingLayout";

export const withAuthAdmin =
  (WrappedComponent: React.ComponentType<any>) =>
  (props: any): ReactElement => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      checkAuth();
    }, []);
    const checkAuth = async () => {
      if (checkAuthenticated()) {
        const decodedJwt = await decodeJwt();
        if (decodedJwt) {
          if (decodedJwt.role === "admin") {
            setLoading(false);
            return <WrappedComponent {...props} />;
          }
          navigate("/");
          return;
        }
        navigate("/");
        return;
      }
      navigate("/");
      return;
    };

    return <WrappedComponent props={<LoadingLayout />} />;
  };
