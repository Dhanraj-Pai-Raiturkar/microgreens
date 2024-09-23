"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserModelSchema = new mongoose_1.default.Schema({
    sub: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if ((value === null || value === void 0 ? void 0 : value.length) <= 1) {
                    return false;
                }
            },
            message: 'name has to be more than 1 character long'
        }
    },
    lastName: String,
    gender: String,
    dob: Date,
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: 'Please enter a valid email'
        }
    },
    mobile: Number,
    countryCode: Number,
    city: {
        type: String,
        required: false,
        index: true
    },
    state: {
        type: String,
        required: false,
        index: true
    },
    country: {
        type: String,
        required: false,
        index: true
    },
    pincode: {
        type: Number,
        required: false
    },
    addressLine1: {
        type: String,
        required: false
    },
    addressLine2: String,
    verified: Boolean,
    role: String
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', exports.UserModelSchema);
