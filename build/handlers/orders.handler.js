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
const orders_1 = require("../models/orders");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const orders = new orders_1.OrdersStore();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const order_status = `${req.query.order_status}`;
        const odr = yield orders.show(id, order_status);
        if (odr) {
            res.json({
                status: 200,
                data: odr,
                message: 'order fetched successfully',
            });
        }
        res.json({
            status: 404,
            data: odr,
            message: 'no order data found',
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
        // const { product_id, product_quantity, order_status } = req.body
        const user_id = Number(req.params.id);
        console.log(user_id);
        if (user_id) {
            const newOdr = yield orders.create(Number(user_id));
            return res.json({
                status: 200,
                data: newOdr,
                message: 'Order created successfully',
            });
        }
        return res
            .status(404)
            .json({ status: 404, msg: 'Faild to create order, data not found' });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = Number(req.body.order_id);
        const product_id = Number(req.body.product_id);
        const product_quantity = Number(req.body.product_quantity);
        if (order_id && product_id && product_quantity) {
            const pdOdr = yield orders.addProduct(order_id, product_id, product_quantity);
            return res.json({
                status: 200,
                data: pdOdr,
                message: 'product added to the order created successfully',
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                msg: 'Faild to add the product to the order, data not found',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const orders_routes = (app) => {
    app.get('/api/user/:id/orders', auth_middleware_1.default, show);
    app.post('/api/user/:id/orders', auth_middleware_1.default, create);
    app.post('/api/user/:id/orders/add-product', auth_middleware_1.default, addProduct);
};
exports.default = orders_routes;
