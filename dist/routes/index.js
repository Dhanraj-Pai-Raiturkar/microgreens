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
const authRoutes_1 = __importDefault(require("./authRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const repositoryLib_1 = require("../lib/repositoryLib");
const router = express_1.default.Router();
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const filterString = req?.query?.filter;
        // const searchString = req?.query?.search;
        // const filter = constructFilter(filterString);
        // const search = constructSearch(searchString, ['title', 'description']);
        // const query = { ...filter, ...search };
        const query = (0, repositoryLib_1.constructQuery)(req, ['title', 'description']);
        // const query = {
        //   $or: [{ title: /^kit/i }, { description: /^kit/i }]
        // };
        const response = yield ProductModel_1.default.find(query);
        res.send({ count: response === null || response === void 0 ? void 0 : response.length, response });
    }
    catch (error) {
        console.error('test error', error);
        res.status(401).send({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
router.use('/auth', authRoutes_1.default);
router.use('/product', productRoutes_1.default);
exports.default = router;
