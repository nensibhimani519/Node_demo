import { api } from "../../util";

export const getServicesApiCall = (payload = {}) => {
  let url = "/services";

  return api.get(url, {
    params: {
      page: payload.page,
      limit: payload.limit,
      filter: payload.filter || {},
      sort: payload.sort,
      //   search: payload.search,
    },
  });
};
