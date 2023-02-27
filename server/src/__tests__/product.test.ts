import mongoose from 'mongoose';
import supertest from 'supertest';

import { mockLoginAdmin, mockLoginUser } from '../mocks/auth.mock';
import {
    mockCreateProduct,
    mockCreateProductWithNonExistingCategory,
    mockNonExistingProduct,
    mockUpdateProduct,
    mockUpdateProductWithNonExistingCategory,
} from '../mocks/product.mock';

import app from '../index';
import db from '../db/tests/db.local.connections';

import CategoryModel from '@/resources/category/category.model';
import ProductModel from '@/resources/product/product.model';

import { products, categories, sizes } from '@/db/tests/seed.data.local';

import { LANGS } from '@/utils/constants';
import { getAccessTokenFromResponse } from '../helpers';

beforeAll(async () => app.close());

beforeEach(async () => {
    // Seeding database with 3 products, 2 categories and 1 test user
    await db.connect();
    const { collections } = mongoose.connection;

    await collections.sizes.insertMany(sizes);
    await collections.products.insertMany(products);
    await collections.categories.insertMany(categories);

    const userRegister = await supertest(app).post('/api/v1/auth/register').send({
        name: 'test_user',
        email: 'test_user@gmail.com',
        password: 'test_password',
    });

    const adminRegister = await supertest(app).post('/api/v1/auth/register').send({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'password',
    });
});

afterEach(async () => {
    await db.clear();
    await db.close();
});

afterAll(async () => app.close());

describe('===== PRODUCT SUIT =====', () => {
    describe('[GET] / GET ALL PRODUCTS', () => {
        it('Should return list of products', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).get('/api/v1/products?all=true').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(3);
        });

        it('Should return list of products with pagination', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).get('/api/v1/products').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data).toHaveLength(3);
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).get('/api/v1/products').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });
    });

    describe('[POST] / CREATE PRODUCT', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).post('/api/v1/products').send(mockCreateProduct);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateProductWithNonExistingCategory);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify({}));

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it("Should return 404, category chosen for product doesn't exist", async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify(mockCreateProductWithNonExistingCategory))
                .attach('image', './src/db/tests/uploads/example.jpeg');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('CATEGORY_NOT_FOUND');
        });

        it('Should successfully create new product', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify(mockCreateProduct))
                .attach('image', './src/db/tests/uploads/example.jpeg');

            const category = await CategoryModel.findById(res.body.category);

            expect(res.status).toBe(200);
            expect(category).not.toBeNull();
            expect(category?.products).toHaveLength(2);

            LANGS.forEach((l) => {
                const resTrans = res.body.translations[l];
                const mockTrans = mockCreateProduct.translations[l];
                expect(resTrans).toEqual(mockTrans);
            });

            expect(res.body.defaultPriceAndSize.price).toBe(mockCreateProduct.defaultPriceAndSize.price);
            expect(res.body.discount).toBe(mockCreateProduct.discount);
            expect(res.body.status.offlineMenu).toBe(mockCreateProduct.status.offlineMenu);
            expect(res.body.status.onlineMenu).toBe(mockCreateProduct.status.onlineMenu);

            expect(res.body).toHaveProperty('_id');
            expect(res.body.recommendedProducts).toBeInstanceOf(Array);
            expect(res.body.recommendedProducts).toHaveLength(0);
        });
    });

    describe('[PUT] / UPDATE PRODUCT', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/products').send({});

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .send(mockNonExistingProduct);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, product not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify(mockNonExistingProduct))
                .attach('image', './src/db/tests/uploads/example.jpeg');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it("Should return 404. chosen category for product doesn't exist", async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify(mockUpdateProductWithNonExistingCategory))
                .attach('image', './src/db/tests/uploads/example.jpeg');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('NO_SUCH_CATEGORY');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify({}))
                .attach('image', './src/db/tests/uploads/example.jpeg');

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully update existing product', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/products')
                .set('Cookie', `accessToken=${token}`)
                .field('product', JSON.stringify(mockUpdateProduct));

            const oldCategory = await CategoryModel.findById('62d7d18bbcebc3056ecc82a3');

            const newCategory = await CategoryModel.findById('62d7d3f702c2dbec852b03bd');

            expect(res.status).toBe(200);
            expect(res.body.recommendedProducts).toBeInstanceOf(Array);
            expect(res.body.recommendedProducts).toHaveLength(1);
            expect(res.body.discount).toBe(15);
            expect(res.body.defaultPriceAndSize.price).toBe(260);

            expect(res.body.translations.ro.name).toBe('TEST_PRODUCT_NAME_1_UPDATED');
            expect(res.body.translations.ro.description).toBe('TEST_PRODUCT_DESCRIPTION_1_UPDATED');

            expect(res.body.translations.ru.name).toBe('TEST_PRODUCT_NAME_2_UPDATED');
            expect(res.body.translations.ru.description).toBe('TEST_PRODUCT_DESCRIPTION_2_UPDATED');

            expect(res.body.category._id.toString()).toBe(mockUpdateProduct.category.toString());

            expect(oldCategory?.products).toHaveLength(0);
            expect(newCategory?.products).toHaveLength(3);
        });
    });

    describe('[DELETE]/:id / DELETE PRODUCT', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/products').send({});

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .delete('/api/v1/products/62d859384fc90c2c13159bc0')
                .set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, product not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .delete('/api/v1/products/62d859384fc90c2c13159bc0')
                .set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it('Should successfully delete a product', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .delete('/api/v1/products/62d7d175177484380eed9c76')
                .set('Cookie', `accessToken=${token}`);

            const deletedProductCategory = await CategoryModel.findById('62d7d18bbcebc3056ecc82a3');
            const deletedProduct = await CategoryModel.findById('62d7d175177484380eed9c76');

            const productThatHadThisInRecommended = await ProductModel.findById('62d7d1bfd0cd92b50f58c7c7');

            expect(res.status).toBe(200);
            expect(deletedProductCategory?.products).toHaveLength(0);
            expect(deletedProduct).toBeNull();
            expect(productThatHadThisInRecommended?.recommendedProducts).toHaveLength(0);
        });
    });
});
