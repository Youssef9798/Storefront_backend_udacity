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
const products_1 = require("../models/products");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const products = new products_1.ProductsStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pds = yield products.index();
        res.json({
            status: 'success',
            data: pds,
            message: 'products fetched successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const pd = yield products.show(id);
        res.json({
            status: 'success',
            data: pd,
            message: 'Product fetched successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category } = req.body;
        if ((name && price) || category) {
            const newPd = yield products.create(name, price, category);
            return res.json({
                status: 'success',
                data: newPd,
                message: 'Product created successfully',
            });
        }
        return res
            .status(500)
            .json({ msg: 'Faild to create Product, data not found' });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const products_routes = (app) => {
    app.get('/api/products', index);
    app.get('/api/products/:id', show);
    app.post('/api/products', auth_middleware_1.default, create);
};
exports.default = products_routes;
