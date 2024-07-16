"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config();
// if (env.error) throw new Error('no .env file found');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const getConnectionString = () => {
    var _a, _b;
    try {
        const password = encodeURIComponent((_a = process.env.MONGODB_PASSWORD) !== null && _a !== void 0 ? _a : '');
        const connectionSrtring = (_b = process.env.MONGODB_CONNECTION_STRING) === null || _b === void 0 ? void 0 : _b.split('@');
        return `${(connectionSrtring === null || connectionSrtring === void 0 ? void 0 : connectionSrtring[0]) + password + '@' + (connectionSrtring === null || connectionSrtring === void 0 ? void 0 : connectionSrtring[1])}`;
    }
    catch (error) {
        console.error('config getConnectionString error', error);
        throw error;
    }
};
exports.default = {
    port: process.env.PORT,
    logs: {
        morgan: process.env.MORGAN
    },
    cognitoUserpoolId: process.env.COGNITO_USERPOOL_ID,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoRegion: process.env.COGNITO_REGION,
    mongoDbConnectionString: getConnectionString(),
    customerGroup: 'customer',
    adminGroup: 'admin'
};
