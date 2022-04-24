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
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const orders = new orders_1.OrdersStore();
const users = new users_1.UsersStore();
const products = new products_1.ProductsStore();
const createdOrder = {
    id: 1,
    user_id: 1,
    order_status: 'active',
};
const createdProductOrder = {
    id: 1,
    order_id: 1,
    product_id: 1,
    product_quantity: 5,
};
describe('Orders Model is Working and Exist', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        let usrResult = yield users.show(1);
        if (usrResult !== undefined) {
            createdOrder.user_id = usrResult.id;
        }
        else {
            usrResult = (yield users.create('Test2@test.com', 'test2', 'tester2', 'password123456'));
        }
        const pdResult = yield products.create('LG TV 55inches', 5000, 'Electronices');
        if (pdResult.id) {
            createdProductOrder.product_id = pdResult.id;
        }
    }));
    describe('Create Method', () => {
        it('Created method must be existed', () => {
            expect(orders.create).toBeDefined();
        });
        it('Order should be created for the User made it', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orders.create(1);
            result.user_id = Number(result.user_id);
            console.log(result);
            createdOrder.id = result.id;
            expect(result).toEqual(createdOrder);
        }));
    });
    describe('Show Method', () => {
        it('Show method must be existed', () => {
            expect(orders.show).toBeDefined();
        });
        it('Order row should be returned when the order id and the order status is given', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orders.show(1, 'active');
            result.user_id = Number(result.user_id);
            createdOrder.id = result.id;
            expect(result).toEqual(createdOrder);
        }));
    });
    describe('Orders - Products is Working and Exist', () => {
        describe('AddProduct Method', () => {
            it('AddProduct method must be existed', () => {
                expect(orders.addProduct).toBeDefined();
            });
            it('Product Should be added to the order', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield orders.addProduct(createdOrder.id, 1, 5);
                result.order_id = Number(result.order_id);
                createdProductOrder.id = result.id;
                createdProductOrder.order_id = createdOrder.id;
                createdProductOrder.product_id = result.product_id;
                expect(result).toEqual(createdProductOrder);
            }));
        });
    });
});
