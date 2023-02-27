import mongoose from 'mongoose';
import supertest from 'supertest';

import { mockLoginAdmin, mockLoginUser } from '../mocks/auth.mock';
import app from '../index';
import db from '../db/tests/db.local.connections';

import CategoryModel from '@/resources/category/category.model';
import ProductModel from '@/resources/product/product.model';

import { products, categories } from '@/db/tests/seed.data.local';

import { mockCreateCategory, mockNonExistingCategory, mockUpdateCategory } from '../mocks/category.mock';

import { LANGS } from '@/utils/constants';
import { getAccessTokenFromResponse } from '../helpers';
import userModel from '@/resources/user/user.model';

beforeAll(async () => app.close());

beforeEach(async () => {
    // Seeding database with 3 products, 2 categories and 1 test user
    await db.connect();
    const { collections } = mongoose.connection;

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

describe('===== CATEGORY SUIT =====', () => {
    describe('[GET] / GET ALL CATEGORIES', () => {
        it('Should return list of categories', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).get('/api/v1/categories').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data).toHaveLength(2);
        });

        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).get('/api/v1/categories');

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });
    });

    describe('[POST] / CREATE CATEGORY', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).post('/api/v1/categories').send(mockCreateCategory);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/categories')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateCategory);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).post('/api/v1/categories').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully create new category', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/categories')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateCategory);

            expect(res.status).toBe(200);

            LANGS.forEach((l) => {
                expect(res.body.translations[l].name).toBe(mockCreateCategory.translations[l].name);
            });
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('products');
            expect(res.body.products).toHaveLength(0);
        });
    });

    describe('[PUT] / UPDATE CATEGORY', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/categories').send({});

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/categories')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateCategory);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, category not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/categories')
                .set('Cookie', `accessToken=${token}`)
                .send(mockNonExistingCategory);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).put('/api/v1/categories').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully update existing category', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const categories = await supertest(app).get('/api/v1/categories');

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/categories')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateCategory);

            const updatedCategory = await CategoryModel.findById(mockUpdateCategory._id);

            expect(res.status).toBe(200);
            LANGS.forEach((l) => {
                expect(res.body.translations[l].name).toBe(mockUpdateCategory.translations[l].name);
            });

            expect(updatedCategory?.products).toHaveLength(2);
        });
    });

    describe('[DELETE]/:id / DELETE CATEGORY', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).delete('/api/v1/categories/12345');

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .delete('/api/v1/categories/62d7d18bbcebc3056ecc82a3')
                .set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, category not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).delete('/api/v1/categories/12345').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it('Should successfully delete a category', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .delete('/api/v1/categories/62d7d18bbcebc3056ecc82a3')
                .set('Cookie', `accessToken=${token}`);

            const deletedProduct = await ProductModel.findById('62d7d175177484380eed9c76');

            const productThatHadDeletedProductInRecommended = await ProductModel.findById('62d7d1bfd0cd92b50f58c7c7');

            const deletedCategory = await CategoryModel.findById('62d7d18bbcebc3056ecc82a3');

            expect(res.status).toBe(200);
            expect(deletedCategory).toBeNull();
            expect(deletedProduct).toBeNull();
            expect(productThatHadDeletedProductInRecommended?.recommendedProducts).toHaveLength(0);
        });
    });
});
