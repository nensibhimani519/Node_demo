import axios from "axios";
import { toast } from "react-toastify";
import { userLogout } from "../redux/auth/actions";
import { BACK_BASE_URL } from "./constants";
import { LocalUtils } from "./localStorage";

export const api = axios.create({
  baseURL: BACK_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `token ${LocalUtils.getToken()}`,
  },
});

api.interceptors.request.use(
  (request) => {
    request.headers = {
      ...request.headers,
      Authorization: `token ${LocalUtils.getToken()}`,
    };
    return request;
  },
  (error) => {
    console.log(error.message);
    return error;
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      toast.error(error?.response?.data?.message || error.message);
    } else if (error.response.status === 401) {
      toast.error(error?.response?.data?.message || error.message);
      return userLogout();  
    }
    return Promise.reject(error);
  }
);
