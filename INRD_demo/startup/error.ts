export = () => {
  process.on("unhandledRejection", (error) => {
    throw error;
  });
};
