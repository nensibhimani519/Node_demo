"use strict";
module.exports = () => {
    process.on("unhandledRejection", (error) => {
        throw error;
    });
};
//# sourceMappingURL=error.js.map