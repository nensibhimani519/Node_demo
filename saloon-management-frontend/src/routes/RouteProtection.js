import React from "react";
import UnauthorizedAccess from "../views/Util/UnauthorizedAccess";
import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_USER, USER_TYPES } from "../util";
import { useSelector } from "react-redux";

const RouteProtection = ({ children, pageAccess }) => {
  let isAutheticated;
  const { role } = useSelector((state) => state.user);
  try {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    if (!user) {
      isAutheticated = false;
    } else {
      isAutheticated = true;
    }
  } catch (error) {
    isAutheticated = false;
  }

  return (
    <React.Fragment>
      {(function () {
        if (isAutheticated) {
          if (pageAccess) {
            return children;
          } else {
            if (role === USER_TYPES.CUSTOMER) {
              return <Navigate to={"/user"} />;
            }
            if (role === USER_TYPES.ADMIN) {
              return <Navigate to={"/billing"} />;
            }
            return <UnauthorizedAccess />;
          }
        } else {
          return <Navigate to={"/login"} />;
        }
      })()}
    </React.Fragment>
  );
};

export default RouteProtection;
