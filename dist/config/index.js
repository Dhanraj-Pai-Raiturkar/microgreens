"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config();
// if (env.error) throw new Error('no .env file found');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
exports.default = {
    port: process.env.PORT,
    logs: {
        morgan: process.env.MORGAN
    },
    cognitoUserpoolId: process.env.COGNITO_USERPOOL_ID,
    cognitoClientId: process.env.COGNITO_CLIENT_ID
};
