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
const products_1 = require("../../models/products");
const products = new products_1.ProductsStore();
const product = {
    id: 1,
    name: 'Toshiiba TV 55inches',
    price: 5000,
    category: 'Electroinces',
};
describe('Procuts Model', () => {
    describe('Index Method', () => {
        it('Index method must be existed', () => {
            expect(products.index).toBeDefined();
        });
        it('All Products should be returned', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.index();
            expect(result).toContain(product);
        }));
    });
    describe('Show Method', () => {
        it('Show method must be existed', () => {
            expect(products.show).toBeDefined();
        });
        it('Product row should be returned when the product id is given', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.show(1);
            expect(result).toEqual(product);
        }));
    });
    describe('Create Method', () => {
        it('Created method must be existed', () => {
            expect(products.create).toBeDefined();
        });
        it('Product should be created', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.create(product.name, product.price, product.category);
            product.id = result.id;
            expect(result).toEqual(product);
        }));
    });
});
