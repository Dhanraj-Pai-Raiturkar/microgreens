"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (req, res, requestField, requriedFields) => {
    const missingFields = requriedFields.filter((reqField) => !Object.keys(req[requestField]).includes(reqField));
    if (missingFields === null || missingFields === void 0 ? void 0 : missingFields.length) {
        res.status(400).json({
            status: false,
            error: `missing the following required ${requestField} field(s): ${missingFields === null || missingFields === void 0 ? void 0 : missingFields.join(', ')}`
        });
        return false;
    }
    return true;
};
exports.default = validateRequest;
