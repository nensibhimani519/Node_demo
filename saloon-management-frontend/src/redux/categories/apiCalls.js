import { api } from "../../util";

export const getSaloonsApiCall = (payload = {}) => {
  let url = "/categories";

  return api.get(url);
};
