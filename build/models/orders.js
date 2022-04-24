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
exports.OrdersStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersStore {
    show(id, order_status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
                const result = yield connection.query(sql, [id, order_status]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Faild to get the order with the following error: ${err.message}`);
            }
        });
    }
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const orderStatus = 'active';
                const sql = 'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
                const result = yield connection.query(sql, [user_id, orderStatus]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Faild to create the order with the following error: ${err.message}`);
            }
        });
    }
    addProduct(order_id, product_id, product_quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                let sql = 'SELECT * FROM orders WHERE id=($1)';
                let result = yield connection.query(sql, [order_id]);
                if (result.rows.length && result.rows[0].order_status === 'active') {
                    sql =
                        'INSERT INTO orders_products (order_id, product_id, product_quantity) VALUES ($1, $2, $3) RETURNING *';
                    result = yield connection.query(sql, [
                        order_id,
                        product_id,
                        product_quantity,
                    ]);
                    connection.release();
                    return result.rows[0];
                }
                else {
                    connection.release();
                    throw new Error(`Faild to add the product to the order, order is not found or maybe completed`);
                }
            }
            catch (err) {
                throw new Error(`Faild to add the product to the order with the following error: ${err.message}`);
            }
        });
    }
}
exports.OrdersStore = OrdersStore;
