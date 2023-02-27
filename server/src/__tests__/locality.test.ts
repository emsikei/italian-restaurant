import mongoose from 'mongoose';
import supertest from 'supertest';

import { mockCreateLocality, mockNonExistingLocality, mockUpdateLocality } from '../mocks/locality.mock';
import { mockLoginAdmin, mockLoginUser } from '../mocks/auth.mock';

import app from '../index';
import db from '../db/tests/db.local.connections';

import { localities } from '@/db/tests/seed.data.local';

import { getAccessTokenFromResponse } from '../helpers';
import LocalityModel from '@/resources/locality/locality.model';

beforeAll(async () => app.close());

beforeEach(async () => {
    // Seeding database with 3 products, 2 categories and 1 test user
    await db.connect();
    const { collections } = mongoose.connection;

    await collections.localities.insertMany(localities);

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

describe('===== LOCALITY SUIT =====', () => {
    describe('[GET] / GET ALL LOCALITIES', () => {
        it('Should return list of localities', async () => {
            const res = await supertest(app).get('/api/v1/localities/all');

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(2);
        });
    });

    describe('[POST] / CREATE LOCALITY', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).post('/api/v1/localities').send(mockCreateLocality);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/localities')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateLocality);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).post('/api/v1/localities').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully create new locality', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .post('/api/v1/localities')
                .set('Cookie', `accessToken=${token}`)
                .send(mockCreateLocality);

            expect(res.status).toBe(200);

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('deliveryCost');
        });
    });

    describe('[PUT] / UPDATE LOCALITY', () => {
        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/localities').send({});

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 403, insufficient permissions', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/localities')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateLocality);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('INSUFFICIENT_PERMISSIONS');
        });

        it('Should return 404, locality not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/localities')
                .set('Cookie', `accessToken=${token}`)
                .send(mockNonExistingLocality);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('RESOURCE_NOT_FOUND');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app).put('/api/v1/localities').set('Cookie', `accessToken=${token}`).send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should successfully update existing locality', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginAdmin);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/localities')
                .set('Cookie', `accessToken=${token}`)
                .send(mockUpdateLocality);

            const updatedLocality = await LocalityModel.findById(mockUpdateLocality._id);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedLocality?.name);
            expect(res.body.deliveryCost).toBe(updatedLocality?.deliveryCost);
        });
    });
});
