"use strict";
module.exports = () => {
    process.on("unhandledRejection", (error) => {
        throw error;
    });
};
