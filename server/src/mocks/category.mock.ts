import mongoose from 'mongoose';

import ICategory from '@/resources/category/category.interface';
import { CategoryCreation, CategoryUpdate } from '@/utils/types';

export const mockCreateCategory: CategoryCreation = {
    translations: {
        ro: { name: 'TEST_NAME' },
        ru: { name: 'TEST_NAME' },
        en: { name: 'TEST_NAME' },
    },
};

export const mockUpdateCategory: CategoryUpdate = {
    _id: new mongoose.Types.ObjectId('62d7d3f702c2dbec852b03bd'),
    translations: {
        ro: { name: 'TEST_NAME_UPDATED' },
        ru: { name: 'TEST_NAME_UPDATED' },
        en: { name: 'TEST_NAME_UPDATED' },
    },
};

export const mockNonExistingCategory: ICategory = {
    _id: new mongoose.Types.ObjectId('62d72d16d28afd9631d46da0'),
    translations: {
        ro: { name: 'TEST_NAME' },
        ru: { name: 'TEST_NAME' },
        en: { name: 'TEST_NAME' },
    },
    products: [],
};

export const mockUpdatedCategory: ICategory = {
    _id: new mongoose.Types.ObjectId('62d28b45ad1bd3d9c534711f'),
    translations: {
        ro: {
            name: 'updated name',
        },
        ru: {
            name: 'updated name',
        },
        en: {
            name: 'updated name',
        },
    },
    products: [
        new mongoose.Types.ObjectId('62d28b53d422654d94d9a7fc'),
        new mongoose.Types.ObjectId('62d28b590aa7eeb0fe5f2a93'),
        new mongoose.Types.ObjectId('62d2d12bd1670e77d1573c7a'),
    ],
};

export const mockCategories: ICategory[] = [
    {
        _id: new mongoose.Types.ObjectId(),
        translations: {
            ro: {
                name: 'test name',
            },
            ru: {
                name: 'test name',
            },
            en: {
                name: 'test name',
            },
        },
        products: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        translations: {
            ro: {
                name: 'test name',
            },
            ru: {
                name: 'test name',
            },
            en: {
                name: 'test name',
            },
        },
        products: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    },
];
