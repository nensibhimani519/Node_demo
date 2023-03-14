import { isPageAccessAllowed } from "../util";
import Login from "../views/auth/Login";
import RequestResetPassword from "../views/auth/RequestResetPassword";
import ResetPassword from "../views/auth/ResetPassword";
import AddBill from "../views/billing/AddBill";
import ListBillings from "../views/billing/ListBillings";
import Dashboard from "../views/Dashboard";
import ListSaloons from "../views/saloons/ListSaloons";
import ListServices from "../views/services/ListServices";
import UpsertService from "../views/services/UpsertService";
import UserScreen from "../views/user-screen";
import UserInfo from "../views/user-screen/UserInfo";

export const publicRoutes = [
  {
    path: "/login",
    component: <Login />,
    title: "Sign in",
  },
  {
    path: "/request-reset-password",
    component: <RequestResetPassword />,
    title: "Request reset password",
  },
  {
    path: "/reset-password/:token",
    component: <ResetPassword />,
    title: "Reset Password",
  },
  {
    path: "/user-info",
    component: <UserInfo />,
    title: "Salon ",
  },
];

export const customerFacingRoutes = [
  {
    path: "/user",
    component: <UserScreen />,
    title: "Salon ",
  },
];

export const getRoutes = (permissions) => {
  return [
    {
      path: "/",
      component: <Dashboard />,
      title: "Dashboard",
      icon: "bi bi-speedometer2",
      isSidebarMenu: true,
      pageAccess: isPageAccessAllowed("dashboard", permissions),
    },
    // services
    {
      path: "/services",
      component: <ListServices />,
      title: "Services",
      icon: "bi bi-hdd-stack",
      isSidebarMenu: true,
      pageAccess: isPageAccessAllowed("service", permissions),
    },
    {
      path: "/services/:id",
      component: <UpsertService />,
      title: "Upsert Services",
      icon: "bi bi-hdd-stack",
      isSidebarMenu: false,
      pageAccess: isPageAccessAllowed("service", permissions),
    },
    {
      path: "/salons",
      component: <ListSaloons />,
      title: "Salons",
      icon: "bi bi-shop",
      isSidebarMenu: true,
      pageAccess: isPageAccessAllowed("saloon", permissions),
    },
    // billing
    {
      path: "/billing",
      component: <ListBillings />,
      title: "Billing",
      icon: "bi bi-cash-coin",
      isSidebarMenu: true,
      pageAccess: isPageAccessAllowed("billing", permissions),
    },
    {
      path: "/billing/add",
      component: <AddBill />,
      title: "Billing",
      icon: "bi bi-cash-coin",
      isSidebarMenu: false,
      pageAccess: isPageAccessAllowed("billing", permissions),
    },
  ];
};
