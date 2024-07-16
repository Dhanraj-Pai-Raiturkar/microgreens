"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castValue = void 0;
const castValue = (value) => {
    try {
        return !isNaN(+value) ? +value : value;
    }
    catch (error) {
        console.error('castValue error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.castValue = castValue;
