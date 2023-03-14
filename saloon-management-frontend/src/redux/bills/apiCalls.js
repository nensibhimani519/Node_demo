import { api } from "../../util";

export const getBillsApiCall = (payload = {}) => {
  let url = "/square/getBillings";

  return api.get(url, {
    params: {
      page: payload.page,
      limit: payload.limit,
      sort: payload.sort,
      filter: payload.filter || {},
      location: payload.location,
    },
  });
};
