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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const users = new users_1.UsersStore();
const { TOKEN_SECRET } = process.env;
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usrs = yield users.index();
        res.json({
            status: 200,
            data: usrs,
            message: 'Users fetched successfully',
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
        const usr = yield users.show(id);
        res.json({
            status: 200,
            data: usr,
            message: 'User fetched successfully',
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
        const { email, firstname, lastname, password } = req.body;
        if (firstname && lastname && password) {
            const newUsr = (yield users.create(email, firstname, lastname, password));
            if (newUsr !== null) {
                return res.json({
                    status: 200,
                    data: newUsr,
                    message: 'User created successfully',
                });
            }
            else {
                return res.json({
                    status: 409,
                    message: 'User already exist',
                });
            }
        }
        return res.status(404).json({ msg: 'Faild to create user, data not found' });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const usr = yield users.authenticateUser(email, password);
        if (usr === null) {
            return res.status(401).json({
                status: 401,
                message: 'the email and password are invalid, please try again',
            });
        }
        const token = jsonwebtoken_1.default.sign({ usr }, TOKEN_SECRET);
        return res.json({
            status: 200,
            data: Object.assign(Object.assign({}, usr), { token }),
            message: 'user is authenticated successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});
const users_routes = (app) => {
    app.get('/api/users', auth_middleware_1.default, index);
    app.get('/api/users/:id', auth_middleware_1.default, show);
    app.post('/api/users', auth_middleware_1.default, create);
    app.post('/api/users/authenticate', authenticate);
};
exports.default = users_routes;
