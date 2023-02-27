import mongoose from 'mongoose';
import supertest from 'supertest';

import { mockCreateSize, mockNonExistingSize, mockUpdateSize } from '../mocks/size.mock';
import { mockLoginAdmin, mockLoginUser } from '../mocks/auth.mock';
import app from '../index';
import db from '../db/tests/db.local.connections';

import { sizes } from '@/db/tests/seed.data.local';

import { LANGS } from '@/utils/constants';
import { getAccessTokenFromResponse } from '../helpers';

import UserModel from '@/resources/user/user.model';

beforeAll(async () => app.close());

beforeEach(async () => {
    await db.connect();
    const { collections } = mongoose.connection;

    await collections.sizes.insertMany(sizes);

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

describe('===== SIZE SUIT =====', () => {
    describe('[GET] / GET ALL SIZES', () => {
        it('Should return list of sizes', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).get('/api/v1/sizes/all').set('Cookie', `accessToken=${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(5);
        });

        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).get('/api/v1/sizes');

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });
    });

    describe('[POST] / CREATE SIZE', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).post('/api/v1/sizes').send(mockCreateSize);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const users = await UserModel.find({});
            console.log(users);

            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/sizes')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateSize);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).post('/api/v1/sizes').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully create new size', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/sizes')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateSize);

            expect(res.status).toBe(200);

            LANGS.forEach((l) => {
                expect(res.body.translations[l].value).toBe(mockCreateSize.translations[l].value);
            });
            expect(res.body).toHaveProperty('_id');
        });
    });

    describe('[PUT] / UPDATE SIZE', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/sizes').send({});

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/sizes')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateSize);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, size not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/sizes')
                .set('Cookie', `accessToken=${token}`)
                .send(mockNonExistingSize);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).put('/api/v1/sizes').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully update existing size', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const sizes = await supertest(app).get('/api/v1/sizes');

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/sizes')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateSize);

            expect(res.status).toBe(200);
            LANGS.forEach((l) => {
                expect(res.body.translations[l].value).toBe(mockUpdateSize.translations[l].value);
            });
        });
    });
});
