"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModelSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProductModelSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (!value) {
                    return false;
                }
            },
            message: 'title cannot be empty'
        }
    },
    description: {
        type: String,
        required: true
    },
    category: String,
    contents: (Array),
    images: (Array),
    thumbnail: String,
    price: Number,
    discount: Number,
    stock: Number
}, { timestamps: true });
exports.default = mongoose_1.default.model('Product', exports.ProductModelSchema);
