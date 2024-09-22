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
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../config/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_2 = __importDefault(require("../routes/index"));
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
    /* ------------------ HEALTH CHECK API's ------------------------ */
    app.get('/status', (req, res) => res.sendStatus(200).end());
    app.head('/status', (req, res) => res.sendStatus(200).end());
    app.enable('trust proxy');
    /* ----------------------- MIDDLEWARES ---------------------------- */
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false
    }));
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(index_2.default);
    app
        .listen(index_1.default === null || index_1.default === void 0 ? void 0 : index_1.default.port, () => {
        console.log(`Server running on ${index_1.default === null || index_1.default === void 0 ? void 0 : index_1.default.port}`);
    })
        .on('error', (error) => {
        console.log(error.message);
        process.exit(1);
    });
});
