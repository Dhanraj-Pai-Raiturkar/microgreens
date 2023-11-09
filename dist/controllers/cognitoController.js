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
exports.CognitoController = void 0;
const cognitoService_1 = require("../services/cognitoService");
const validateRequest_1 = __importDefault(require("../lib/validateRequest"));
class CognitoController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ['name', 'email', 'password', 'gender'];
                const { name, email, password, gender } = req.body;
                if ((0, validateRequest_1.default)(req, res, 'body', requiredFields)) {
                    const response = yield this.cognitoService.signUp({
                        name,
                        email,
                        password,
                        gender
                    });
                    if (response === null || response === void 0 ? void 0 : response.status)
                        res.status(201).json(response);
                    else
                        res.status(400).json(response);
                }
            }
            catch (error) {
                console.error('/sign-up error', error);
                res.status(400).json({ error });
            }
        });
        this.confirmSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ['email', 'confirmationCode'];
                const { email, confirmationCode } = req.body;
                if ((0, validateRequest_1.default)(req, res, 'body', requiredFields)) {
                    const response = yield this.cognitoService.confirmSignUp({
                        email,
                        confirmationCode
                    });
                    if (response === null || response === void 0 ? void 0 : response.status)
                        res.status(200).json(response);
                    else
                        res.status(400).json(response);
                }
            }
            catch (error) {
                console.log('/confirm error', error);
                res.status(400).json({ error });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFeilds = ['email', 'password'];
                const { email, password } = req.body;
                if ((0, validateRequest_1.default)(req, res, 'body', requiredFeilds)) {
                    const response = yield this.cognitoService.signIn({
                        email,
                        password
                    });
                    if (response === null || response === void 0 ? void 0 : response.status)
                        res.status(200).json(response);
                    else
                        res.status(400).json(response);
                }
            }
            catch (error) {
                console.log('/sign-in error', error);
                res.status(400).json({ error });
            }
        });
        this.resendConfirmationCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const requiredFeilds = ['email'];
                const email = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
                if ((0, validateRequest_1.default)(req, res, 'query', requiredFeilds)) {
                    const response = yield this.cognitoService.resendConfirmationCode(email);
                    if (response === null || response === void 0 ? void 0 : response.status)
                        res.status(200).json(response);
                    else
                        res.status(400).json(response);
                }
            }
            catch (error) {
                console.log('/resendConfirmationCode error', error);
                res.status(400).json({ error });
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            try {
                const requiredFeilds = ['email'];
                const email = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email) === null || _d === void 0 ? void 0 : _d.toString();
                if ((0, validateRequest_1.default)(req, res, 'query', requiredFeilds)) {
                    const response = yield this.cognitoService.forgotPassword(email);
                    res.status(200).json(response);
                }
            }
            catch (error) {
                console.log('CognitoController forgotPassword error', error);
            }
        });
        this.confirmPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ['email', 'newPassword', 'verificationCode'];
                const { email, newPassword, verificationCode } = req === null || req === void 0 ? void 0 : req.body;
                if ((0, validateRequest_1.default)(req, res, 'body', requiredFields)) {
                    const response = yield this.cognitoService.confirmPassword({
                        email,
                        newPassword,
                        verificationCode
                    });
                    res.status(200).json(response);
                }
            }
            catch (error) {
                res.status(400).json(error);
                console.log('CognitoController changePassword error', error);
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ['email', 'oldPassword', 'newPassword'];
                const { email, oldPassword, newPassword } = req === null || req === void 0 ? void 0 : req.body;
                if ((0, validateRequest_1.default)(req, res, 'body', requiredFields)) {
                    const response = yield this.cognitoService.changePassword({
                        email,
                        oldPassword,
                        newPassword
                    });
                    res.status(200).json(response);
                }
            }
            catch (error) {
                res.status(400).json(error);
                console.log('CognitoController changePassword error', error);
            }
        });
        this.cognitoService = new cognitoService_1.CognitoService();
    }
}
exports.CognitoController = CognitoController;
