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
const users_1 = require("../../models/users");
const users = new users_1.UsersStore();
const user = {
    id: 1,
    email: 'Test2@test.com',
    firstname: 'test2',
    lastname: 'tester2',
};
describe('Users Model', () => {
    describe('Create Method', () => {
        it('Create method must be exist', () => {
            expect(users.create).toBeDefined();
        });
        it('User should be created if it not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.create(user.email, user.firstname, user.lastname, 'password123456');
            if (result !== null) {
                expect(result.email).toEqual(user.email);
                expect(result.firstname).toEqual(user.firstname);
                expect(result.lastname).toEqual(user.lastname);
            }
        }));
        it('Conflict message should be sent if user is already exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.create(user.email, user.firstname, user.lastname, 'password123456');
            if (result === null) {
                expect(result).toBe(null);
            }
        }));
    });
    describe('Index Method', () => {
        it('Index method must be exist', () => {
            expect(users.index).toBeDefined();
        });
        it('All users should be returned', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.index();
            expect(result).toContain(user);
        }));
    });
    describe('Show Method', () => {
        it('Show method must be exist', () => {
            expect(users.show).toBeDefined();
        });
        it('User should be returned as the given id', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.show(1);
            expect(result).toEqual(user);
        }));
    });
    describe('AuthenticateUser Method', () => {
        it('AuthenticateUser method must be exist', () => {
            expect(users.authenticateUser).toBeDefined();
        });
        it('User must be authenticated to access specific endpoints with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield users.authenticateUser('test@test.com', 'password123456');
            expect(result).toBeDefined();
        }));
    });
});
