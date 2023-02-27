import mongoose from 'mongoose';
import supertest from 'supertest';

import { mockLoginUser } from '../mocks/auth.mock';
import app from '../index';
import db from '../db/tests/db.local.connections';

import { products, categories } from '@/db/tests/seed.data.local';
import { getAccessTokenFromResponse } from '../helpers';

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
});

afterEach(async () => {
    await db.clear();
    await db.close();
});

afterAll(async () => app.close());

describe('===== AUTH MIDDLEWARE SUIT =====', () => {
    it('Should return 401, unauthorized user - no access token', async () => {
        const res = await supertest(app).post('/api/v1/categories');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('NO_ACCESS_TOKEN');
    });
});

describe('===== ROLES MIDDLEWARE SUIT =====', () => {
    it('Should return 403, user has insufficient permissions', async () => {
        const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

        const token = getAccessTokenFromResponse(userLogin);

        const res = await supertest(app).post('/api/v1/categories').set('Cookie', `accessToken=${token}`);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
    });
});
