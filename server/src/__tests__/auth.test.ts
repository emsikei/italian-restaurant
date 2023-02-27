import mongoose from 'mongoose';
import supertest from 'supertest';
import bcrypt from 'bcrypt';

import app from '../index';
import db from '../db/tests/db.local.connections';

import UserModel from '@/resources/user/user.model';

import { products, categories } from '@/db/tests/seed.data.local';

import {
    mockLoginInvalidEmailUser,
    mockLoginInvalidPasswordUser,
    mockLoginNonExistingUser,
    mockLoginUser,
    mockNonValidEmailRegisterUser,
    mockNonValidPasswordRegisterUser,
    mockRegisterUser,
    mockChangePasswordInvalidOldPassword,
    mockChangePasswordTheSamePasswords,
    mockChangePasswordUserNotFound,
    mockChangePasswordValid,
} from '../mocks/auth.mock';
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
    app.close();
});

afterAll(async () => app.close());

describe('===== AUTH SUIT =====', () => {
    describe('[REGISTER]', () => {
        it('Should register a user', async () => {
            const res = await supertest(app).post('/api/v1/auth/register').send(mockRegisterUser);

            const user = await UserModel.findOne({ email: mockRegisterUser.email });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User successfully registered!');

            expect(user).not.toBeNull();
            expect(user?.email).toBe(mockRegisterUser.email);
            expect(user?.name).toBe(mockRegisterUser.name);
            expect(user?.roles).toContain('USER');
        });

        it('Should return 422, validation error', async () => {
            const res = await supertest(app).post('/api/v1/auth/register').send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should return 422, invalid email', async () => {
            const res = await supertest(app).post('/api/v1/auth/register').send(mockNonValidEmailRegisterUser);

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
            expect(res.body.errors[0].email).toBe('This is not an email');
        });

        it('Should return 422, invalid password length', async () => {
            const res = await supertest(app).post('/api/v1/auth/register').send(mockNonValidPasswordRegisterUser);

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
            expect(res.body.errors[0].password).toBe('Password should be between 8 and 14 characters long');
        });
    });

    describe('[LOGIN]', () => {
        it('Should login the user, expire time 1h', async () => {
            const res = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User logged in!');
        });

        it('Should return 422, validation error', async () => {
            const res = await supertest(app).post('/api/v1/auth/login').send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });

        it('Should return 422, invalid email', async () => {
            const res = await supertest(app).post('/api/v1/auth/login').send(mockLoginInvalidEmailUser);

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
            expect(res.body.errors[0].email).toBe('This is not an email');
        });

        it('Should return 400, user not found', async () => {
            const res = await supertest(app).post('/api/v1/auth/login').send(mockLoginNonExistingUser);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('USER_NOT_FOUND');
        });

        it('Should return 400, invalid password', async () => {
            const res = await supertest(app).post('/api/v1/auth/login').send(mockLoginInvalidPasswordUser);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('INVALID_PASSWORD');
        });
    });

    describe('[PASSWORD CHANGE]', () => {
        it('Should change password successfully', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/auth/password-change')
                .set('Cookie', `accessToken=${token}`)
                .send(mockChangePasswordValid);

            const user = await UserModel.findOne({
                email: mockChangePasswordValid.email,
            });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Password changed');

            expect(await bcrypt.compare(mockChangePasswordValid.newPassword, user?.password as string)).toBe(true);
        });

        it('Should return 401, unauthorized user', async () => {
            const res = await supertest(app).put('/api/v1/auth/password-change').send(mockChangePasswordValid);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('NO_ACCESS_TOKEN');
        });

        it('Should return 404, user with given email not found', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/auth/password-change')
                .set('Cookie', `accessToken=${token}`)
                .send(mockChangePasswordUserNotFound);

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('USER_NOT_FOUND');
        });

        it('Should return 400, invalid old password', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/auth/password-change')
                .set('Cookie', `accessToken=${token}`)
                .send(mockChangePasswordInvalidOldPassword);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('INVALID_PASSWORD');
        });

        it('Should return 400, old and new password are the same', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/auth/password-change')
                .set('Cookie', `accessToken=${token}`)
                .send(mockChangePasswordTheSamePasswords);

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('NEW_PASSWORD_EQUALS_TO_OLD');
        });

        it('Should return 422, validation error', async () => {
            const userLogin = await supertest(app).post('/api/v1/auth/login').send(mockLoginUser);

            const token = getAccessTokenFromResponse(userLogin);

            const res = await supertest(app)
                .put('/api/v1/auth/password-change')
                .set('Cookie', `accessToken=${token}`)
                .send({});

            expect(res.status).toBe(422);
            expect(res.body.message).toBe('VALIDATION_ERROR');
        });
    });
});
