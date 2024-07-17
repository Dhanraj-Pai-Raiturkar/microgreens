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
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const cognitoService_1 = require("../services/cognitoService");
const repositoryLib_1 = require("../lib/repositoryLib");
class UserController {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.cognitoService = new cognitoService_1.CognitoService();
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, repositoryLib_1.constructQuery)(req, ['firstName', 'lastName', 'email']);
                const response = yield this.userRepository.read(query);
                res.status(200).send({
                    status: true,
                    message: 'success',
                    count: response === null || response === void 0 ? void 0 : response.length,
                    data: response
                });
            }
            catch (error) {
                console.error('UserController read error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
                const body = req === null || req === void 0 ? void 0 : req.body;
                if (!email || !body)
                    throw new Error('missing required parameters');
                const response = yield this.userRepository.update(email, body);
                res.status(200).send({
                    status: true,
                    message: 'success',
                    data: response
                });
            }
            catch (error) {
                console.error('UserController update error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    delete(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sub = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.sub) === null || _b === void 0 ? void 0 : _b.toString();
                if (!sub)
                    throw new Error('missing required parameter sub');
                const deleteMongoDbUser = this.userRepository.delete(sub);
                const deleteCognitoUser = this.cognitoService.deleteCognitoUser(sub);
                yield Promise.all([deleteMongoDbUser, deleteCognitoUser]);
                res.status(200).send({ status: true, message: 'success' });
            }
            catch (error) {
                console.error('UserController delete error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = UserController;
