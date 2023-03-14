export default () => {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
