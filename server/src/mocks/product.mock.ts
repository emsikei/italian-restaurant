import mongoose from 'mongoose';

import IProduct from '@/resources/product/product.interface';
import { ProductCreation } from '@/utils/types';

export const mockCreateProduct: ProductCreation = {
    category: new mongoose.Types.ObjectId('62d7d18bbcebc3056ecc82a3'),
    translations: {
        ro: {
            name: 'TEST_NAME_CREATE_1',
            description: 'TEST_DESC_CREATE_1',
        },
        ru: {
            name: 'TEST_NAME_CREATE_2',
            description: 'TEST_DESC_CREATE_2',
        },
        en: {
            name: 'TEST_NAME_CREATE_3',
            description: 'TEST_DESC_CREATE_3',
        },
    },
    status: {
        onlineMenu: true,
        offlineMenu: false,
    },
    pricesAndSizes: [
        {
            size: '6380fd9da1246c9410059ddc',
            price: 260,
        },
        {
            size: '6380fd9da1246c9410059ddb',
            price: 45,
        },
    ],
    defaultPriceAndSize: {
        size: '6380fd9da1246c9410059ddc',
        price: 260,
    },
    discount: 15,
    recommendedProducts: [],
};

export const mockNonExistingProduct: IProduct = {
    _id: new mongoose.Types.ObjectId('62d72d16d28afd9631d46da0'),
    category: new mongoose.Types.ObjectId('62d80949a9aae48c0ecaf4ce'),
    translations: {
        ro: {
            name: 'TEST_NAME_CREATE_1',
            description: 'TEST_DESC_CREATE_1',
        },
        ru: {
            name: 'TEST_NAME_CREATE_2',
            description: 'TEST_DESC_CREATE_2',
        },
        en: {
            name: 'TEST_NAME_CREATE_3',
            description: 'TEST_DESC_CREATE_3',
        },
    },
    status: {
        onlineMenu: true,
        offlineMenu: false,
    },
    pricesAndSizes: [
        {
            size: '6380fd9da1246c9410059ddc',
            price: 260,
        },
        {
            size: '6380fd9da1246c9410059ddb',
            price: 45,
        },
    ],
    defaultPriceAndSize: {
        size: '6380fd9da1246c9410059ddc',
        price: 260,
    },
    publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
    imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
    discount: 15,
    recommendedProducts: [],
};

export const mockUpdateProduct: IProduct = {
    _id: new mongoose.Types.ObjectId('62d7d175177484380eed9c76'),
    category: new mongoose.Types.ObjectId('62d7d3f702c2dbec852b03bd'),
    discount: 15,
    recommendedProducts: [new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc')],
    publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
    imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
    translations: {
        ro: {
            name: 'TEST_PRODUCT_NAME_1_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_1_UPDATED',
        },
        ru: {
            name: 'TEST_PRODUCT_NAME_2_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_2_UPDATED',
        },
        en: {
            name: 'TEST_PRODUCT_NAME_3_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_3_UPDATED',
        },
    },
    status: {
        onlineMenu: true,
        offlineMenu: false,
    },
    pricesAndSizes: [
        {
            size: '6380fd9da1246c9410059ddc',
            price: 260,
        },
        {
            size: '6380fd9da1246c9410059ddb',
            price: 45,
        },
    ],
    defaultPriceAndSize: {
        size: '6380fd9da1246c9410059ddc',
        price: 260,
    },
};

export const mockCreateProductWithNonExistingCategory: ProductCreation = {
    category: new mongoose.Types.ObjectId('62d850355cf6c818b72b59d5'),
    discount: 15,
    recommendedProducts: [new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc')],
    translations: {
        ro: {
            name: 'TEST_PRODUCT_NAME_1_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_1_UPDATED',
        },
        ru: {
            name: 'TEST_PRODUCT_NAME_2_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_2_UPDATED',
        },
        en: {
            name: 'TEST_PRODUCT_NAME_3_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_3_UPDATED',
        },
    },
    status: {
        onlineMenu: true,
        offlineMenu: false,
    },
    pricesAndSizes: [
        {
            size: '6380fd9da1246c9410059ddc',
            price: 260,
        },
        {
            size: '6380fd9da1246c9410059ddb',
            price: 45,
        },
    ],
    defaultPriceAndSize: {
        size: '6380fd9da1246c9410059ddc',
        price: 260,
    },
};

export const mockUpdateProductWithNonExistingCategory: IProduct = {
    _id: new mongoose.Types.ObjectId('62d7d175177484380eed9c76'),
    category: new mongoose.Types.ObjectId('62d850355cf6c818b72b59d5'),
    discount: 15,
    recommendedProducts: [new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc')],
    publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
    imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
    translations: {
        ro: {
            name: 'TEST_PRODUCT_NAME_1_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_1_UPDATED',
        },
        ru: {
            name: 'TEST_PRODUCT_NAME_2_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_2_UPDATED',
        },
        en: {
            name: 'TEST_PRODUCT_NAME_3_UPDATED',
            description: 'TEST_PRODUCT_DESCRIPTION_3_UPDATED',
        },
    },
    status: {
        onlineMenu: true,
        offlineMenu: false,
    },
    pricesAndSizes: [
        {
            size: '6380fd9da1246c9410059ddc',
            price: 260,
        },
        {
            size: '6380fd9da1246c9410059ddb',
            price: 45,
        },
    ],
    defaultPriceAndSize: {
        size: '6380fd9da1246c9410059ddc',
        price: 260,
    },
};
