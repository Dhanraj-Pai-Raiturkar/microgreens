"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const verifyJwt_1 = require("../lib/verifyJwt");
const authenticateJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.split('=')) === null || _c === void 0 ? void 0 : _c[1];
        if (token) {
            const response = yield (0, verifyJwt_1.verify)(token);
            console.log('resposne: ', response);
            next();
        }
        else
            res.status(401).json({ status: false, message: 'unauthorized' });
    }
    catch (error) {
        console.log('error', error);
        res.status(401).json({ status: false, message: 'unauthorized' });
    }
});
exports.authenticateJwt = authenticateJwt;
