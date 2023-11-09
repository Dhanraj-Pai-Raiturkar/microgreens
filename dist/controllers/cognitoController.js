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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoController = void 0;
const cognitoService_1 = require("../services/cognitoService");
class CognitoController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, gender } = req.body;
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
            catch (error) {
                console.error('/sign-up error', error);
                res.status(400).json({ error });
            }
        });
        this.confirmSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, confirmationCode } = req.body;
                const response = yield this.cognitoService.confirmSignUp({
                    email,
                    confirmationCode
                });
                if (response === null || response === void 0 ? void 0 : response.status)
                    res.status(200).json(response);
                else
                    res.status(400).json(response);
            }
            catch (error) {
                console.log('/confirm error', error);
                res.status(400).json({ error });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.cognitoService.signIn({
                    email,
                    password
                });
                if (response === null || response === void 0 ? void 0 : response.status)
                    res.status(200).json(response);
                else
                    res.status(400).json(response);
            }
            catch (error) {
                console.log('/sign-in error', error);
                res.status(400).json({ error });
            }
        });
        this.resendConfirmationCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const email = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
                if (!email)
                    res.status(400).json({
                        status: false,
                        error: `missing required query param(s): ${['email'].join(',')}`
                    });
                else {
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
                const email = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email) === null || _d === void 0 ? void 0 : _d.toString();
                if (!email)
                    res.status(400).json({
                        status: false,
                        error: `missing required field(s): ${['email'].join(',')}`
                    });
                else {
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
                const { email, newPassword, verificationCode } = req === null || req === void 0 ? void 0 : req.body;
                if (!email || !newPassword || !verificationCode)
                    res.status(400).json({
                        status: false,
                        error: `missing required field(s): ${[
                            'email',
                            'newPassword',
                            'verificationCode'
                        ]
                            .filter((field) => !req.body[field])
                            .join(', ')}`
                    });
                else {
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
                console.log('CognitoController forgotPassword error', error);
            }
        });
        this.cognitoService = new cognitoService_1.CognitoService();
    }
}
exports.CognitoController = CognitoController;
