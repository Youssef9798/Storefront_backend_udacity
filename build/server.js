"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
/**
 * Routes
 */
const products_handler_1 = __importDefault(require("./handlers/products.handler"));
const orders_handler_1 = __importDefault(require("./handlers/orders.handler"));
const users_handler_1 = __importDefault(require("./handlers/users.handler"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_handler_1.default)(app);
(0, orders_handler_1.default)(app);
(0, users_handler_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
