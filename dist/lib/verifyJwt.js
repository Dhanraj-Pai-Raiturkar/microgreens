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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const aws_jwt_verify_1 = require("aws-jwt-verify");
const config_1 = __importDefault(require("../config"));
const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
                userPoolId: config_1.default.cognitoUserpoolId,
                clientId: config_1.default.cognitoClientId,
                tokenUse: 'id'
            });
            const response = yield verifier.verify(token, {
                clientId: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.cognitoClientId
            });
            resolve(response);
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.verify = verify;
