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
const productController_1 = __importDefault(require("../controllers/productController"));
const authorizeMiddleware_1 = require("../middlewares/authorizeMiddleware");
const index_1 = __importDefault(require("../config/index"));
const productRoutes = express_1.default.Router();
const productController = new productController_1.default();
productRoutes.post('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productController.create(req, res);
}));
productRoutes.get('/', authenticateMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productController.read(req, res);
}));
productRoutes.put('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productController.update(req, res);
}));
productRoutes.delete('/', authenticateMiddleware_1.authenticateJwt, (0, authorizeMiddleware_1.authorizeJwt)(index_1.default.adminGroup), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productController.delete(req, res);
}));
exports.default = productRoutes;
