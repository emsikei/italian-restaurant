import mongoose from 'mongoose';

// eslint-disable-next-line import/no-unresolved
import db from '../db/tests/db.local.connections';

import CategoryModel from '@/resources/category/category.model';
import ProductModel from '@/resources/product/product.model';
import UserModel from '@/resources/user/user.model';
import LocalityModel from '@/resources/locality/locality.model';
import SizeModel from '@/resources/size/size.model';

import { products, categories, localities, sizes } from '@/db/tests/seed.data.local';

beforeAll(async () => {
    await db.connect();
    const { collections } = mongoose.connection;

    await collections.sizes.insertMany(sizes);
    await collections.products.insertMany(products);
    await collections.categories.insertMany(categories);
    await collections.localities.insertMany(localities);
});

afterAll(async () => {
    await db.clear();
    await db.close();
});

describe('===== DB SUIT =====', () => {
    it('Should seed db', async () => {
        const sizes = await SizeModel.find({});
        const products = await ProductModel.find({});
        const categories = await CategoryModel.find({});
        const users = await UserModel.find({});
        const localities = await LocalityModel.find({});

        expect(sizes).toBeInstanceOf(Array);
        expect(sizes).toHaveLength(5);

        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(3);

        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(2);

        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(0);

        expect(localities).toBeInstanceOf(Array);
        expect(localities).toHaveLength(2);
    });
});
