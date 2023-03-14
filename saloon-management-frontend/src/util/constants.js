export const BACK_BASE_URL = process.env.REACT_APP_BACK_BASE_URL;
export const BACK_SOCKET_URL = process.env.REACT_APP_BACK_SOCKET_URL;
export const FRONT_BASE_URL = process.env.REACT_APP_FRONT_BASE_URL;

export const LOCAL_STORAGE_USER = "saloon-management-local-storage-user";
export const BILLING_DATA_KEY = "saloon-billing-data";

/**
 * 1000 * 60 * 2 = 2 minutes
 * The time interval on which we'll send ping pong socket events
 */
export const SOCKET_PING_PONG_INTERVAL = 1000 * 60 * 2;

/**
 * 1000 * 60 * 3 = 3 minutes
 * The time limit, when timestamp from socket is older than this timeout limit
 * we declare connection inactive
 */
export const SOCKET_PING_PONG_TIMEOUT = 1000 * 60 * 3;

/**
 * 1000 * 60 * 1 = 1 minute | 
 * The time interval we'll check if socket timestamp is older then current time 
 */
export const SOCKET_PING_PONG_INTERVAL_CHECK_TIMESTAMP = 1000 * 60 * 1;


export const EMAIL_REGEX =
  /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;

export const CATEGORIES = [
  "Eyebrow Threading",
  "Eyelash",
  "Hair Service",
  "Henna",
  "Other Threading",
  "Products",
  "Services",
  "Skincare",
  "Tinting",
  "Waxing",
  "Other",
];

// ROLES
export const USER_TYPES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  CUSTOMER: 3,
};

export const SOCKET = {
  CONNECT: "connect",

  EMIT_JOIN: "EMIT_JOIN",
  EMIT_BILLING_DATA_CHANGE: "EMIT_BILLING_DATA_CHANGE",
  EMIT_BILLING_FINALIZE: "EMIT_BILLING_FINALIZE",

  EMIT_USER_DATA_CHANGE: "EMIT_USER_DATA_CHANGE",
  LISTEN_USER_DATA_CHANGE: "LISTEN_USER_DATA_CHANGE",

  LISTEN_BILLING_FINALIZE: "LISTEN_BILLING_FINALIZE",
  RECEIVE_BILLING_DATA_CHANGE: "RECEIVE_BILLING_DATA_CHANGE",

  LISTEN_DEVICE_PAIRED_CHANGE: "LISTEN_DEVICE_PAIRED_CHANGE",

  LISTEN_PAYMENT_STATUS_CHANGE: "LISTEN_PAYMENT_STATUS_CHANGE",
};

export const PAYMENT_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  ADDING_SERVICES: "ADDING_SERVICES",
  FINALIZED: "FINALIZED",
  PAYMENT_TYPE_CASH: "PAYMENT_TYPE_CASH",
  PAYMENT_TYPE_CARD: "PAYMENT_TYPE_CARD",
  PAYMENT_TYPE_CONFIRM: "PAYMENT_TYPE_CONFIRM",
  PAYMENT_TYPE_SELECTED: "PAYMENT_TYPE_SELECTED",

  SQUARE_PAYMENT_STARTED: "SQUARE_PAYMENT_STARTED",
  PAYMENT_DONE: "PAYMENT_DONE",
  FAILED: "FAILED",
  SUCCESSFUL: "SUCCESSFUL",
  REQUEST_CANCEL_SQUARE_PAYMENT: "REQUEST_CANCEL_SQUARE_PAYMENT",
  CANCELED: "CANCELED",
};
export const BILLING = {
  userData: {},
  checkoutList: [],
  paymentType: "",

  isPaymentComplete: false,
  isPaymentStarted: false,
  paymentStatus: PAYMENT_STATUS.NOT_STARTED,
};

export const SQUARE_PAYMENT_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  CANCEL_REQUESTED: "CANCEL_REQUESTED",
  CANCELED: "CANCELED",
  COMPLETED: "COMPLETED",
};
