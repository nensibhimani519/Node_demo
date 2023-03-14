"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
};
//# sourceMappingURL=error.js.map