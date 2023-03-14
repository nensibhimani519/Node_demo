import { api } from "../../util";

export const getEmployeesApiCall = (payload = {}) => {
  let url = "/employees";

  return api.get(url);
};
