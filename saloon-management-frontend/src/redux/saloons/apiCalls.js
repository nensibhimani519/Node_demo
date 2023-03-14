import { api } from "../../util";

export const getSaloonsApiCall = (payload = {}) => {
  let url = "/saloons";

  return api.get(url, {
    params: {
      page: payload.page,
      limit: payload.limit,
      //   filter: payload.filter || {},
      //   sort: payload.sort,
      //   search: payload.search,
    },
  });
};
