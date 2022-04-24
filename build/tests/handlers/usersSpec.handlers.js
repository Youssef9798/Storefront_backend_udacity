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
describe('Users endpoints', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users.authenticateUser('test@test.com', 'password123456');
        token = jsonwebtoken_1.default.sign({ user }, TOKEN_SECRET);
    }));
    describe('[GET] List All Users endpoint: /api/products', () => {
        it('All Users should be returned with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield req
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('[GET] List Single User endpoint: /api/user/:id', () => {
        it('Single User should be returned with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield req
                .get('/api/users/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    // describe('[POST] Create product endpoint: /api/products/', () => {
    //   it('Product should be created if user is authenticated with a token', async () => {
    //     await req
    //       .post('/api/products')
    //       .set('Authorization', `Bearer ${token}`)
    //       .send({
    //         name: 'Test',
    //         price: 500,
    //         category: 'testing',
    //       })
    //       .expect(200)
    //   })
    // })
});
