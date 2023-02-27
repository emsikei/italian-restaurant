import mongoose from 'mongoose';

import ICategory from '@/resources/category/category.interface';
import IProduct from '@/resources/product/product.interface';
import IUser from '@/resources/user/user.interface';
import ILocality from '@/resources/locality/locality.interface';
import ISize from '@/resources/size/size.interface';

export const products: IProduct[] = [
    {
        // First product -> first category
        _id: new mongoose.Types.ObjectId('62d7d175177484380eed9c76'),
        category: new mongoose.Types.ObjectId('62d7d18bbcebc3056ecc82a3'),
        discount: 10,
        recommendedProducts: [
            new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc'),
            new mongoose.Types.ObjectId('62d7d1bfd0cd92b50f58c7c7'),
        ],
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
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
        translations: {
            ro: {
                name: 'TEST_PRODUCT_NAME_1',
                description: 'TEST_PRODUCT_DESCRIPTION_1',
            },
            ru: {
                name: 'TEST_PRODUCT_NAME_2',
                description: 'TEST_PRODUCT_DESCRIPTION_2',
            },
            en: {
                name: 'TEST_PRODUCT_NAME_3',
                description: 'TEST_PRODUCT_DESCRIPTION_3',
            },
        },
    },
    {
        // Second product -> to second category
        _id: new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc'),
        category: new mongoose.Types.ObjectId('62d7d3f702c2dbec852b03bd'),
        discount: 10,
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
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        recommendedProducts: [],
        publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
        translations: {
            ro: {
                name: 'TEST_PRODUCT_NAME_4',
                description: 'TEST_PRODUCT_DESCRIPTION_4',
            },
            ru: {
                name: 'TEST_PRODUCT_NAME_5',
                description: 'TEST_PRODUCT_DESCRIPTION_5',
            },
            en: {
                name: 'TEST_PRODUCT_NAME_6',
                description: 'TEST_PRODUCT_DESCRIPTION_6',
            },
        },
    },
    {
        // Third product -> to second category
        _id: new mongoose.Types.ObjectId('62d7d1bfd0cd92b50f58c7c7'),
        category: new mongoose.Types.ObjectId('62d7d3f702c2dbec852b03bd'),
        discount: 10,
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
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        recommendedProducts: [new mongoose.Types.ObjectId('62d7d175177484380eed9c76')],
        publicId: 'f598d463-973e-4121-a4b5-f4d0792aac0d',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1657540186/f598d463-973e-4121-a4b5-f4d0792aac0d.jpg',
        translations: {
            ro: {
                name: 'TEST_PRODUCT_NAME_7',
                description: 'TEST_PRODUCT_DESCRIPTION_7',
            },
            ru: {
                name: 'TEST_PRODUCT_NAME_8',
                description: 'TEST_PRODUCT_DESCRIPTION_8',
            },
            en: {
                name: 'TEST_PRODUCT_NAME_9',
                description: 'TEST_PRODUCT_DESCRIPTION_9',
            },
        },
    },
];

export const sizes: ISize[] = [
    {
        _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddb'),
        translations: {
            ro: {
                value: '150 g',
            },
            en: {
                value: '150 g',
            },
            ru: {
                value: '150 г',
            },
        },
    },
    {
        _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddc'),
        translations: {
            ro: {
                value: '1000 g',
            },
            en: {
                value: '1000 g',
            },
            ru: {
                value: '1000 г',
            },
        },
    },
    {
        _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddd'),
        translations: {
            ro: {
                value: '0.25 l',
            },
            en: {
                value: '0.25 l',
            },
            ru: {
                value: '0.25 л',
            },
        },
    },
    {
        _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059dde'),
        translations: {
            ro: {
                value: '0.5 l',
            },
            en: {
                value: '0.5 l',
            },
            ru: {
                value: '0.5 л',
            },
        },
    },
    {
        _id: new mongoose.Types.ObjectId('6380fd9da1246c9410059ddf'),
        translations: {
            ro: {
                value: '1 l',
            },
            en: {
                value: '1 l',
            },
            ru: {
                value: '1 л',
            },
        },
    },
];

export const categories: ICategory[] = [
    {
        _id: new mongoose.Types.ObjectId('62d7d18bbcebc3056ecc82a3'),
        slug: 'test-category',
        translations: {
            ro: {
                name: 'TEST_CATEGORY_NAME_1',
            },
            ru: {
                name: 'TEST_CATEGORY_NAME_2',
            },
            en: {
                name: 'TEST_CATEGORY_NAME_3',
            },
        },
        products: [new mongoose.Types.ObjectId('62d7d175177484380eed9c76')],
    },
    {
        _id: new mongoose.Types.ObjectId('62d7d3f702c2dbec852b03bd'),
        slug: 'test-category',
        translations: {
            ro: {
                name: 'TEST_CATEGORY_NAME_4',
            },
            ru: {
                name: 'TEST_CATEGORY_NAME_5',
            },
            en: {
                name: 'TEST_CATEGORY_NAME_6',
            },
        },
        products: [
            new mongoose.Types.ObjectId('62d7d1b7d2c7e058b60936cc'),
            new mongoose.Types.ObjectId('62d7d1bfd0cd92b50f58c7c7'),
        ],
    },
];

export const users: IUser[] = [
    {
        _id: new mongoose.Types.ObjectId('631455ad05be5eb52203aec0'),
        roles: ['USER'],
        name: 'test_user',
        email: 'test_user@gmail.com',
        password: '$2b$12$Q.NwDlrbeWc4kPOQeg7cku51l/jl9Q2s2VDfgXnGgjBYuz0h6kzNe', // 'password'
        token: {
            value: '',
            expiresIn: new Date(),
        },
    },
    {
        _id: new mongoose.Types.ObjectId('631455ad05be5eb52203aec1'),
        roles: ['USER', 'ADMIN'],
        name: 'admin',
        email: 'admin@gmail.com',
        password: '$2b$12$Q.NwDlrbeWc4kPOQeg7cku51l/jl9Q2s2VDfgXnGgjBYuz0h6kzNe', // 'password'
        token: {
            value: '',
            expiresIn: new Date(),
        },
    },
];

export const localities: ILocality[] = [
    {
        _id: new mongoose.Types.ObjectId('636696436a91a2dd0a0e3de0'),
        name: 'Stauceni',
        deliveryCost: 70,
    },
    {
        _id: new mongoose.Types.ObjectId('636696436a91a2dd0a0e3de1'),
        name: 'Durlesti',
        deliveryCost: 60,
    },
];
