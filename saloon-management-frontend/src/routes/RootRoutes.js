import React, { lazy } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout";
import { getDefaultRoute, LocalUtils, USER_TYPES } from "../util";
import { customerFacingRoutes, publicRoutes } from "./index";
import { getRoutes } from "./index";
import RouteProtection from "./RouteProtection";

const Login = lazy(() => import("../views/auth/Login"));
function RootRoutes() {
  const { permissions, role, id } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {customerFacingRoutes.map(({ component, path, title }, key) => (
          <Route
            path={path}
            element={
              <UnauthenticatedLayout title={title}>
                {component}
              </UnauthenticatedLayout>
            }
            key={key}
          />
        ))}

        {publicRoutes.map(({ component, path, title }, key) => (
          <Route
            path={path}
            element={(function () {
              const token = LocalUtils.getToken();
              if (!!token) {
                return <Navigate to={getDefaultRoute(role)} />;
              } else {
                return (
                  <UnauthenticatedLayout title={title}>
                    {component}
                  </UnauthenticatedLayout>
                );
              }
            })()}
            key={key}
          />
        ))}

        {getRoutes(permissions).map(
          ({ component, path, title, pageAccess = false }, key) => (
            <Route
              path={path}
              element={
                <AuthenticatedLayout title={title}>
                  <RouteProtection pageAccess={pageAccess}>
                    {component}
                  </RouteProtection>
                </AuthenticatedLayout>
              }
              key={key}
            />
          )
        )}

        <Route path="/login" element={<Login />} />

        <Route
          path="*"
          element={(function () {
            if (role === USER_TYPES.ADMIN) {
              return <Navigate to="/billing" />;
            } else if (role === USER_TYPES.CUSTOMER) {
              return <Navigate to="/user" />;
            }
            return <Navigate to="/" />;
          })()}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RootRoutes;
