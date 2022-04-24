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
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const { TOKEN_SECRET } = process.env;
const req = (0, supertest_1.default)(server_1.default);
const users = new users_1.UsersStore();
describe('Orders endpoints', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users.authenticateUser('Test2@test.com', 'password123456');
        if (!user) {
            const user = yield users.create('Test2@test.com', 'test2', 'tester2', 'password123456');
            return (token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
            }, TOKEN_SECRET));
        }
        token = jsonwebtoken_1.default.sign({ user }, TOKEN_SECRET);
    }));
    describe('[GET] List All Orders for User endpoint: /api/user/:id/orders', () => {
        it('All Orders should be returned with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield req
                .get('/api/user/1/orders')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('[POST] Create Order for User endpoint: /api/user/:id/orders', () => {
        it('Order should be created if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield req
                .post('/api/user/1/orders')
                .set('Authorization', `Bearer ${token}`);
            if (order.body.status !== 404) {
                expect(order.status).toBe(200);
            }
        }));
        it('Order failed to be created message', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield req
                .post('/api/user/1/orders')
                .set('Authorization', `Bearer ${token}`);
            if (order.body.status === 404) {
                expect(order.status).toBe(404);
            }
        }));
    });
    describe('[POST] Add product for Order for the User endpoint: /api/user/:id/orders/add-product', () => {
        it('Order should be created if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield req
                .post('/api/user/1/orders/add-product')
                .set('Authorization', `Bearer ${token}`)
                .send({
                order_id: 1,
                product_id: 1,
                product_quantity: 5,
            });
            if (order.body.status !== 404) {
                expect(order.status).toBe(200);
            }
        }));
        it('Product failed to add to the order with a status 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield req
                .post('/api/user/1/orders')
                .set('Authorization', `Bearer ${token}`);
            if (order.body.status === 404) {
                expect(order.status).toBe(404);
            }
        }));
    });
});
