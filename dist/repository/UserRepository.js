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
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserRepository {
    constructor() { }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = new UserModel_1.default(user);
                const data = yield response.save();
                console.log('UserRepository::createUser user created successfuly', data);
                return;
            }
            catch (error) {
                console.error('UserRepository createUser error', error);
                throw error;
            }
        });
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield UserModel_1.default.findOne({ email }).exec();
                console.log('UserRepository::createUser user found', response);
                return response;
            }
            catch (error) {
                console.error('UserRepository createUser error', error);
                throw error;
            }
        });
    }
    updateUser(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield UserModel_1.default.findOneAndUpdate({ email }, data);
                console.log('UserRepository::updateUser update response', response);
                return response;
            }
            catch (error) {
                console.error('UserRepository createUser error', error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
