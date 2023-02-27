import mongoose from 'mongoose';

import { SizeCreate } from '@/utils/types/size.types';
import ISize from '@/resources/size/size.interface';

export const mockCreateSize: SizeCreate = {
    translations: {
        ro: { value: 'TEST_NAME' },
        ru: { value: 'TEST_NAME' },
        en: { value: 'TEST_NAME' },
    },
};

export const mockUpdateSize: ISize = {
    _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddb'),
    translations: {
        ro: { value: 'TEST_NAME_UPDATED' },
        ru: { value: 'TEST_NAME_UPDATED' },
        en: { value: 'TEST_NAME_UPDATED' },
    },
};

export const mockNonExistingSize: ISize = {
    _id: new mongoose.Types.ObjectId('62d72d16d28afd9631d46da0'),
    translations: {
        ro: { value: 'TEST_NAME' },
        ru: { value: 'TEST_NAME' },
        en: { value: 'TEST_NAME' },
    },
};

export const mockUpdatedSize: ISize = {
    _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddb'),
    translations: {
        ro: {
            value: 'updated value',
        },
        ru: {
            value: 'updated value',
        },
        en: {
            value: 'updated value',
        },
    },
};

export const mockSizes: ISize[] = [
    {
        _id: new mongoose.Types.ObjectId(),
        translations: {
            ro: {
                value: 'test value',
            },
            ru: {
                value: 'test value',
            },
            en: {
                value: 'test value',
            },
        },
    },
    {
        _id: new mongoose.Types.ObjectId(),
        translations: {
            ro: {
                value: 'test value',
            },
            ru: {
                value: 'test value',
            },
            en: {
                value: 'test value',
            },
        },
    },
];
