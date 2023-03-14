import { api, BACK_BASE_URL } from "../../util"
import axios from "axios"
export const loginApiCall = (payload) => {
    return axios.post(`${BACK_BASE_URL}/auth/signin`, payload)
}

export const getUserApiCall = (id) => {
    return api.get(`/users/detail/${id}`)
}
