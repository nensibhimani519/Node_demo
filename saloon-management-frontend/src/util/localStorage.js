import { LOCAL_STORAGE_USER } from "./constants";

export const LocalUtils = {
  /**
   *
   * @param {String} key - localStorage key | Declaring key as constants is recommended
   * @returns Object
   */
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },

  /**
   *
   * @param {String} key - - localStorage key | Declaring key as constants is recommended
   * @param {*} key
   */
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   *
   * @param {}
   * @return {String|null} TOKEN
   */
  getToken: () => {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    if (!user) return null;
    return user.token;
  },
};
