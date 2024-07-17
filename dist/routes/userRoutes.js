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
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const userController_1 = __importDefault(require("../controllers/userController"));
const authorizeMiddleware_1 = require("../middlewares/authorizeMiddleware");
const index_1 = __importDefault(require("../config/index"));
const userRoutes = express_1.default.Router();
const userController = new userController_1.default();
userRoutes.get('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.read(req, res);
}));
userRoutes.put('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.update(req, res);
}));
userRoutes.delete('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.delete(req, res);
}));
exports.default = userRoutes;
