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
exports.UsersStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const hashPassword = (password) => {
    const salt = parseInt(SALT_ROUNDS, 10);
    return bcrypt_1.default.hashSync(`${password}${BCRYPT_PASSWORD}`, salt);
};
class UsersStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, email, firstname, lastname FROM users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Failed to get the users with the following error: ${err.message}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, email, firstname, lastname FROM users WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Failed to get the user with the following error: ${err.message}`);
            }
        });
    }
    create(email, firstName, lastName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                let sql = 'SELECT * from users WHERE email=($1)';
                let result = yield connection.query(sql, [email]);
                if (result.rows[0] !== undefined) {
                    connection.release();
                    return null;
                }
                sql =
                    'INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *';
                result = yield connection.query(sql, [
                    email,
                    firstName,
                    lastName,
                    hashPassword(password),
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Faild to insert user data with the following error: ${err.message}`);
            }
        });
    }
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=($1)';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const validPassword = bcrypt_1.default.compareSync(`${password}${BCRYPT_PASSWORD}`, hashPassword);
                    if (validPassword) {
                        const userData = yield connection.query('SELECT id, email, firstName, lastName FROM users WHERE email=($1)', [email]);
                        connection.release();
                        return userData.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (err) {
                throw new Error(`Failed to login or find the user with the following error: ${err.message}`);
            }
        });
    }
}
exports.UsersStore = UsersStore;
