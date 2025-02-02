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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../config/index"));
class MongooseSingleton {
    constructor() {
        if (!this._mongoose) {
            this._connect();
            this._mongoose = this._mongoose;
        }
        return this._mongoose;
    }
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = index_1.default.mongoDbConnectionString;
                console.log('uri', uri);
                const connection = yield mongoose_1.default.connect(uri);
                console.log('MongooseSingleton connection successful');
                return connection;
            }
            catch (error) {
                console.error('MongooseSingleton::_connect error', error);
                throw error;
            }
        });
    }
}
exports.default = MongooseSingleton;
