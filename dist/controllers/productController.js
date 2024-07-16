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
const ProductRepository_1 = __importDefault(require("../repository/ProductRepository"));
const repositoryLib_1 = require("../lib/repositoryLib");
class ProductController {
    constructor() {
        this.productRepository = new ProductRepository_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const response = yield this.productRepository.create(body);
                res
                    .status(200)
                    .send({ status: true, message: 'success', data: response });
            }
            catch (error) {
                console.error('ProductController add error', error);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, repositoryLib_1.constructQuery)(req, ['title', 'description']);
                const response = yield this.productRepository.read(query);
                res.status(200).send({
                    status: true,
                    message: 'success',
                    count: response === null || response === void 0 ? void 0 : response.length,
                    data: response
                });
            }
            catch (error) {
                console.error('ProductController get error', error);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    update(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : body === null || body === void 0 ? void 0 : body.id;
                const response = yield this.productRepository.update(id, body);
                res.status(200).send({
                    status: true,
                    message: 'success',
                    data: response
                });
            }
            catch (error) {
                console.error('ProductController get error', error);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    delete(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const id = (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : body === null || body === void 0 ? void 0 : body.id;
                const response = yield this.productRepository.delete(id);
                res.status(200).send({
                    status: true,
                    message: 'success',
                    data: response
                });
            }
            catch (error) {
                console.error('ProductController get error', error);
                res.status(400).send({ error: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = ProductController;
