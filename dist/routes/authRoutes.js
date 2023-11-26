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
const express_1 = __importDefault(require("express"));
const cognitoController_1 = require("../controllers/cognitoController");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeMiddleware_1 = require("../middlewares/authorizeMiddleware");
const authRoutes = express_1.default.Router();
const cognitoController = new cognitoController_1.CognitoController();
authRoutes.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.signUp(req, res);
}));
authRoutes.post('/confirm-sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.confirmSignUp(req, res);
}));
authRoutes.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.signIn(req, res);
}));
authRoutes.get('/resend-confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.resendConfirmationCode(req, res);
}));
authRoutes.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.forgotPassword(req, res);
}));
authRoutes.post('/confirm-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.confirmPassword(req, res);
}));
authRoutes.post('/change-password', authenticateMiddleware_1.authenticateJwt, authorizeMiddleware_1.authorizeJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.changePassword(req, res);
}));
authRoutes.post('/validate-jwt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cognitoController.changePassword(req, res);
}));
exports.default = authRoutes;
