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
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const uuid_1 = require("uuid");
class ProductRepository {
    constructor() { }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                data.id = (0, uuid_1.v4)();
                const product = new ProductModel_1.default(data);
                const response = yield product.save();
                console.log('ProductRepository create response', response);
                return response;
            }
            catch (error) {
                console.error('ProductRepository create error', error);
                throw error;
            }
        });
    }
    read(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ProductModel_1.default.find(query);
                console.log('ProductRepository read response size', response === null || response === void 0 ? void 0 : response.length);
                return response;
            }
            catch (error) {
                console.error('ProductRepository read error', error);
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield ProductModel_1.default.findOneAndUpdate({ id }, data);
                console.log('ProductRepository update response', response);
                return response;
            }
            catch (error) {
                console.error('ProductRepository update error', error);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id)
                    throw new Error('missing required parameter id');
                const response = yield ProductModel_1.default.deleteOne({ id });
                console.log('ProductRepository delete response', response);
                return response;
            }
            catch (error) {
                console.error('ProductRepository delete error', error);
                throw error;
            }
        });
    }
}
exports.default = ProductRepository;
