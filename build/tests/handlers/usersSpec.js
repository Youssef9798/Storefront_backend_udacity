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
    describe('[GET] List All Users endpoint: /api/users', () => {
        it('All Users should be returned with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield req
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('[GET] List Single User endpoint: /api/users/:id', () => {
        it('Single User should be returned with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield req
                .get('/api/users/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('[POST] Create User endpoint: /api/users/', () => {
        it('User should be created if user is authenticated with a token and not already exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield req
                .post('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: 'Test2@test.com',
                firstname: 'test2',
                lastname: 'tester2',
                password: 'testingpassword',
            });
            if (user.body.status !== 409) {
                expect(user.status).toBe(200);
            }
        }));
        it('Conflict message should be sent if user is already exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield req
                .post('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: 'Test2@test.com',
                firstname: 'test2',
                lastname: 'tester2',
                password: 'testingpassword',
            });
            if (user.body.status === 409) {
                expect(user.body.status).toBe(409);
            }
        }));
    });
    describe('[POST] Authenticate User endpoint: /api/users/authenticate', () => {
        it('User should be authenticated if user is exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield req.post('/api/users/authenticate').send({
                email: 'Test2@test.com',
                password: 'testingpassword',
            });
            if (res.body.status !== 401) {
                expect(res.status).toBe(200);
            }
        }));
        it('Data not found message should be sent if user is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield req.post('/api/users/authenticate').send({
                email: 'Test2@test.com',
                password: 'testingpassword',
            });
            if (res.body.status === 401) {
                expect(res.status).toBe(401);
            }
        }));
    });
});
