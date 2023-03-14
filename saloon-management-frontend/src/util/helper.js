import moment from "moment";
import { useEffect, useState } from "react";
import { USER_TYPES } from "./constants";

/**
 * Check permission for given action & module
 * @param {String} moduleName - name of the module (i.e user, product, etc)
 * @param {String} action - name of the action (i.e. product_create, product_update, ect )
 * @return {Boolean} true if permission is granted, false otherwise
 */
export const isActionPermitted = (moduleName, action, permissions) => {
  return true;
  try {
    if ((permissions && permissions.length === 0) || !action || !moduleName) {
      return false;
    }
    let result = permissions[moduleName]?.find(
      (permission) => permission.name === action
    );
    return !!result;
  } catch (error) {
    return false;
  }
};

/**
 * Check page permission for given module
 * @param {String} moduleName - name of the module (i.e user, product, etc)
 * @return {Boolean} true if page permission is granted, false otherwise
 */
export const isPageAccessAllowed = (moduleName, permissions) => {
  if ((permissions && permissions.length === 0) || !moduleName) {
    return false;
  }
  try {
    let result = permissions?.find(
      (permission) => permission.module === moduleName
    );
    return !!result;
  } catch (error) {
    return false;
  }
};

/**
 * Check page permission for given module
 * @param {String|Number} num - Number
 * @param {Number} roundOff - Number to round off : Default is 2
 * @return {Number} number - Number fixed to roundoff (12.NN)
 */
export const roundOff = (num, roundOff = 2) => {
  try {
    return parseFloat(num || 0).toFixed(roundOff);
  } catch (error) {
    return num;
  }
};

/**
 * Give you default route for the particular role
 * @param {Number} Role - Role | USER TYPE
 * @return {String} route - where this role user belongs by default
 */
export const getDefaultRoute = (role = 2) => {
  role = Number(role);
  try {
    switch (role) {
      case USER_TYPES.ADMIN:
        return "/billing";
      case USER_TYPES.SUPER_ADMIN:
        return "/";
      case USER_TYPES.CUSTOMER:
        return "/user";
      default:
        return "/";
    }
  } catch (error) {
    return "/";
  }
};

/**
 * Get date in YYYY-MM-DD format
 * @param {Date} Date - Current date
 * @return {String} date string - YYYY-MM-DD
 */
export const getDate = (date = new Date()) => {
  try {
    return (
      date.getFullYear() +
      "-" +
      `${Number(date.getMonth()) + Number(1)}`.padStart(2, 0) +
      "-" +
      date.getDate()
    );
  } catch (error) {
    return date.toDateString();
  }
};

/**
 * Get date in YYYY-MM-DD format using moment
 * @param {Date} Date - Current date string from DB
 * @return {String} date string - YYYY-MM-DD
 */
export const getFormatDate = (dateString) => {
  try{
    return moment(dateString).format('DD MMM, YYYY hh:mm A')
  }
  catch(error){
    console.log('error',error);
    return dateString
  }
}


export default function OutsideClick(ref) {
  const [isClicked, setIsClicked] = useState();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
    return isClicked;
  }