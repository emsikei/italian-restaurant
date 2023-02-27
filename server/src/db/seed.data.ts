import mongoose from 'mongoose';
import IProduct from '@/resources/product/product.interface';
import ICategory from '@/resources/category/category.interface';
import IUser from '@/resources/user/user.interface';
import ILocality from '@/resources/locality/locality.interface';
import ISize from '@/resources/size/size.interface';

// Categories:
//     1. 6314621f1e3cb8df5a1cd416 - Pizza
// - [x] 631464468aa8d1944d61872f (Sentiero)
// - [x] 631467c7373f2072e9f0802c (Salsiccia/Funghi)
// - [x] 6314685abbd176e3ffba49b6 (Romana)
// - [x] 631468bd23a92d07101234b8 (Prosciutto crudo)
// - [x] 6314695b05123280357e7ef4 (Pizza Pazza)
// - [x] 6314696a3749c54d98551930 (Pizza della Casa)
// - [x] 63146982275a70821959ac14 (Pizza de post)
// - [x] 63146998d34a1b0e0ad56fad (Piccantina)
// - [x] 631469a67f52746205444319 (Parmigiana)
// - [x] 631469a878a3d1c5d04de7c4 (Nuvola)
//
// 2. 6314622cae2dc4a76673563a - Vin
// - [x] 63147a7790fd2cf221ce52e7 - Bad Boys Carpe Diem (750 ml - 330 lei)
// - [x] 63147ac335ba029afa7d1785 - Fume Blanc Crama Mircești (750 ml - 255 lei )
// - [x] 63147acd956074622bf81f2f - Pinot Noir Crama Mircești (750 ml - 230 lei)
// - [x] 63147ca6ad6f65c3eaf0a88b - Fautor Aurore Feteasca Neagra & Rara Neagra (750 ml - 408 lei)

// 3. 6314623526261f60afd97f8b - Bauturi
// - [x] 631473a53dec72992e1d4d70 (Sprite 0.5)
// - [x] 631473b0eabb990c0d9f199a (Fuze tea 0.5)
// - [x] 63147458e89364cea6746064 (Cappy Pulpy 0,33 L)
// - [x] 6314747f254d524cfbeac3a1 (Băutura Tymbark)
// 4. 6314624141102c7923bc00ef - Pizza Mix

export const categories: ICategory[] = [
    {
        _id: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        slug: 'pizza',
        translations: {
            ro: {
                name: 'Pizza',
            },
            ru: {
                name: 'Пицца',
            },
            en: {
                name: 'Pizza',
            },
        },
        products: [
            new mongoose.Types.ObjectId('631464468aa8d1944d61872f'),
            new mongoose.Types.ObjectId('631467c7373f2072e9f0802c'),
            new mongoose.Types.ObjectId('6314685abbd176e3ffba49b6'),
            new mongoose.Types.ObjectId('631468bd23a92d07101234b8'),
            new mongoose.Types.ObjectId('6314695b05123280357e7ef4'),
            new mongoose.Types.ObjectId('6314696a3749c54d98551930'),
            new mongoose.Types.ObjectId('63146982275a70821959ac14'),
            new mongoose.Types.ObjectId('63146998d34a1b0e0ad56fad'),
            new mongoose.Types.ObjectId('631469a67f52746205444319'),
            new mongoose.Types.ObjectId('631469a878a3d1c5d04de7c4'),
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('6314622cae2dc4a76673563a'),
        slug: 'wine',
        translations: {
            ro: {
                name: 'Vin',
            },
            ru: {
                name: 'Вино',
            },
            en: {
                name: 'Wine',
            },
        },
        products: [
            new mongoose.Types.ObjectId('63147a7790fd2cf221ce52e7'),
            new mongoose.Types.ObjectId('63147ac335ba029afa7d1785'),
            new mongoose.Types.ObjectId('63147acd956074622bf81f2f'),
            new mongoose.Types.ObjectId('63147ca6ad6f65c3eaf0a88b'),
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('6314623526261f60afd97f8b'),
        slug: 'drinks',
        translations: {
            ro: {
                name: 'Bauturi',
            },
            ru: {
                name: 'Напитки',
            },
            en: {
                name: 'Drinks',
            },
        },
        products: [
            new mongoose.Types.ObjectId('631473a53dec72992e1d4d70'),
            new mongoose.Types.ObjectId('631473b0eabb990c0d9f199a'),
            new mongoose.Types.ObjectId('63147458e89364cea6746064'),
            new mongoose.Types.ObjectId('6314747f254d524cfbeac3a1'),
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('6314624141102c7923bc00ef'),
        slug: 'pizza-mix',
        translations: {
            ro: {
                name: 'Pizza Mixta',
            },
            ru: {
                name: 'Пицца микс',
            },
            en: {
                name: 'Pizza mix',
            },
        },
        products: [],
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
        _id: new mongoose.Types.ObjectId('63810ffda1246c9410059de0'),
        translations: {
            ro: {
                value: '0.7 l',
            },
            en: {
                value: '0.7 l',
            },
            ru: {
                value: '0.7 л',
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

export const products: IProduct[] = [
    // Pizzas
    {
        _id: new mongoose.Types.ObjectId('631464468aa8d1944d61872f'),
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
        translations: {
            ro: {
                name: 'Sentiero',
                description:
                    'Mozzarella, philadelphia, ciuperci, salsiccia (carne tocată), pancetta (becon), ulei cu usturoi',
            },
            ru: {
                name: 'Sentiero',
                description: 'Моцарелла, филадельфия, грибы, колбаса (фарш), панчетта (бекон), чесночное ',
            },
            en: {
                name: 'Sentiero',
                description: 'Mozzarella, philadelphia, mushrooms, salsiccia, pancetta (becon), garlic oil',
            },
        },
        recommendedProducts: [
            // Bad Boys Carpe Diem (Wine)
            new mongoose.Types.ObjectId('63147a7790fd2cf221ce52e7'),
            // Fume Blanc Crama Mircești
            new mongoose.Types.ObjectId('63147ac335ba029afa7d1785'),
            // Pinot Noir Crama Mircești
            new mongoose.Types.ObjectId('63147acd956074622bf81f2f'),
            // Fautor Aurore Feteasca Neagra & Rara Neagra
            new mongoose.Types.ObjectId('63147ca6ad6f65c3eaf0a88b'),
        ],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'sentiero-_-1585152440_kkg9kx',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283076/sentiero-_-1585152440_kkg9kx.png',
    },
    {
        _id: new mongoose.Types.ObjectId('631467c7373f2072e9f0802c'),
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
        translations: {
            ro: {
                name: 'Salsiccia/Funghi',
                description: 'Sos de roșii, mozzarella, carne tocată (salsiccia), ciuperci',
            },
            ru: {
                name: 'Salsiccia/Funghi',
                description: 'Томатный соус, моцарелла, фарш (salsiccia), грибы',
            },
            en: {
                name: 'Salsiccia/Funghi',
                description: 'Tomato sauce, mozzarella, ground meat (salsiccia), mashrooms',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'salsiccia-_funghi-_-1585145231_zxbpw0',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283206/salsiccia-_funghi-_-1585145231_zxbpw0.png',
    },
    {
        _id: new mongoose.Types.ObjectId('6314685abbd176e3ffba49b6'),
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
        translations: {
            ro: {
                name: 'Romana',
                description: 'Sos de roșii, mozarella, salsiccia, spanac, masline kalamata (cu sâmbure), usturoi',
            },
            ru: {
                name: 'Romana',
                description: 'Томатный соус, моцарелла, фарш (salsiccia), маслины каламата (с косточкой), чеснок',
            },
            en: {
                name: 'Romana',
                description: 'Tomato sauce, mozzarella, salsiccia, spinach, olives, garlic',
            },
        },
        recommendedProducts: [
            // Fume Blanc Crama Mircești
            new mongoose.Types.ObjectId('63147ac335ba029afa7d1785'),
        ],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'romana-_-1585147504_tijjvp',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283247/romana-_-1585147504_tijjvp.png',
    },
    {
        _id: new mongoose.Types.ObjectId('631468bd23a92d07101234b8'),
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
        translations: {
            ro: {
                name: 'Prosciutto crudo',
                description: 'Sos de roșii, mozarella, prosciutto crudo',
            },
            ru: {
                name: 'Prosciutto crudo',
                description: 'Томатный соус, моцарелла, прошутто крудо',
            },
            en: {
                name: 'Prosciutto crudo',
                description: 'Tomato sauce, mozzarella, prosciutto crudo',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'prosciutto-crudo-_-1585147243_xuzoac',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283309/prosciutto-crudo-_-1585147243_xuzoac.png',
    },
    {
        _id: new mongoose.Types.ObjectId('6314695b05123280357e7ef4'),
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
        translations: {
            ro: {
                name: 'Pizza Pazza',
                description: 'Sos de roșii, mozzarella, salsiccia, gorgonzola, salam picant, ceapă',
            },
            ru: {
                name: 'Pizza Pazza',
                description: 'Томатный соус, моцарелла, фарш (salsiccia), горгонзола, салями, лук',
            },
            en: {
                name: 'Pizza Pazza',
                description: 'Tomato sauce, mozzarella, salsiccia, gorgonzola, spicy sausage, onion',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'pizza-_pazza-_-1585148894_ysil3k',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283347/pizza-_pazza-_-1585148894_ysil3k.png',
    },
    {
        _id: new mongoose.Types.ObjectId('6314696a3749c54d98551930'),
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
        translations: {
            ro: {
                name: 'Pizza della Casa',
                description: 'Sos de roșii, mozzarella, becon (pancetta), roșii, ciuperci, parmezan',
            },
            ru: {
                name: 'Pizza della Casa',
                description: 'Томатный соус, моцарелла, бекон (pancetta), помидоры, грибы, пармезан',
            },
            en: {
                name: 'Pizza della Casa',
                description: 'Tomato sauce, mozzarella, becon (pancetta), tomatoes, mushrooms, parmezan',
            },
        },
        recommendedProducts: [
            // Pinot Noir Crama Mircești
            new mongoose.Types.ObjectId('63147acd956074622bf81f2f'),
            // Fautor Aurore Feteasca Neagra & Rara Neagra
            new mongoose.Types.ObjectId('63147ca6ad6f65c3eaf0a88b'),
        ],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'pizza-della-casa-_-1585149157_mlflbb',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283386/pizza-della-casa-_-1585149157_mlflbb.png',
    },
    {
        _id: new mongoose.Types.ObjectId('63146982275a70821959ac14'),
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
        translations: {
            ro: {
                name: 'Pizza de post',
                description:
                    'Sos de roșii, vinete, ardei dulce, masline, broccoli, ceapă, porumb, fasole, ciuperci, ulei de usturoi',
            },
            ru: {
                name: 'Pizza de post',
                description:
                    'Томатный соус, моцарелла, баклажаны, сладкий перец, оливы, лук, кукуруза, фасоль, грибы, чесночное масло',
            },
            en: {
                name: 'Pizza de post',
                description:
                    'Tomato sauce, eggplants, sweet pepper, olives, broccoli, onion, corn, beans, mashrooms, garlic oil',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'pizza-de-post-_-1585147961_kqxndo',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283493/pizza-de-post-_-1585147961_kqxndo.png',
    },
    {
        _id: new mongoose.Types.ObjectId('63146998d34a1b0e0ad56fad'),
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
        translations: {
            ro: {
                name: 'Piccantina',
                description: 'Mozzarella, salam picant, gorgonzola, roșii cherry, spanac, oregano',
            },
            ru: {
                name: 'Piccantina',
                description: 'Моцарелла, острое салями, горгонзола, помидоры черри, шпинат, орегано',
            },
            en: {
                name: 'Piccantina',
                description: 'Mozzarella, spicy sausage, gorgonzola, cherry tomatoes, spinach, oregano',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'piccantina-_-1585152163_yhnreo',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283532/piccantina-_-1585152163_yhnreo.png',
    },
    {
        _id: new mongoose.Types.ObjectId('631469a67f52746205444319'),
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
        translations: {
            ro: {
                name: 'Parmigiana',
                description: 'Sos de roșii, mozarella, jambon, vinete, parmezan',
            },
            ru: {
                name: 'Parmigiana',
                description: 'Томатный соус, моцарелла, ветчина, баклажаны, пармезан',
            },
            en: {
                name: 'Parmigiana',
                description: 'Tomato sauce, mozarella, jambon, eggplants, parmezan',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'parmigiana-_-1585147396_ibsofz',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283564/parmigiana-_-1585147396_ibsofz.png',
    },
    {
        _id: new mongoose.Types.ObjectId('631469a878a3d1c5d04de7c4'),
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
        translations: {
            ro: {
                name: 'Nuvola',
                description: 'Mozzarella, crevete, philadelphia, oțet balsamic',
            },
            ru: {
                name: 'Nuvola',
                description: 'Моцарелла, креветки, филадельфия, бальзамический уксус',
            },
            en: {
                name: 'Nuvola',
                description: 'Mozzarella, shrimps, philadelphia, balsamic vinegar',
            },
        },
        recommendedProducts: [
            // Fume Blanc Crama Mircești
            new mongoose.Types.ObjectId('63147ac335ba029afa7d1785'),
            // Pinot Noir Crama Mircești
            new mongoose.Types.ObjectId('63147acd956074622bf81f2f'),
        ],
        category: new mongoose.Types.ObjectId('6314621f1e3cb8df5a1cd416'),
        publicId: 'nuvola-_-1585151499_skzkip',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662283572/nuvola-_-1585151499_skzkip.png',
    },

    // Drinks
    {
        _id: new mongoose.Types.ObjectId('631473a53dec72992e1d4d70'),
        pricesAndSizes: [
            {
                size: '6380fd9da1246c9410059ddd',
                price: 12,
            },
            {
                size: '6380fd9da1246c9410059dde',
                price: 18,
            },
            {
                size: '6380fd9da1246c9410059ddf',
                price: 24,
            },
        ],
        defaultPriceAndSize: {
            size: '6380fd9da1246c9410059ddf',
            price: 24,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Sprite',
                description: 'Sprite',
            },
            ru: {
                name: 'Sprite',
                description: 'Sprite',
            },
            en: {
                name: 'Sprite',
                description: 'Sprite',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314623526261f60afd97f8b'),
        publicId: 'sprite-o.5_l-_-1586784983_eq4sox',
        imageUrl: 'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662285057/sprite-o.5_l-_-1586784983_eq4sox.jpg',
    },
    {
        _id: new mongoose.Types.ObjectId('631473b0eabb990c0d9f199a'),
        pricesAndSizes: [
            {
                size: '6380fd9da1246c9410059ddd',
                price: 12,
            },
            {
                size: '6380fd9da1246c9410059dde',
                price: 18,
            },
            {
                size: '6380fd9da1246c9410059ddf',
                price: 24,
            },
        ],
        defaultPriceAndSize: {
            size: '6380fd9da1246c9410059ddf',
            price: 24,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Fuze Tea',
                description: 'Fuze Tea',
            },
            ru: {
                name: 'Fuze Tea',
                description: 'Fuze Tea',
            },
            en: {
                name: 'Fuze Tea',
                description: 'Fuze Tea',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314623526261f60afd97f8b'),
        publicId: '12491557568542-_-1586785139_iwo5v1',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662285147/12491557568542-_-1586785139_iwo5v1.jpg',
    },
    {
        _id: new mongoose.Types.ObjectId('63147458e89364cea6746064'),
        pricesAndSizes: [
            {
                size: '6380fd9da1246c9410059ddd',
                price: 12,
            },
            {
                size: '6380fd9da1246c9410059dde',
                price: 18,
            },
            {
                size: '6380fd9da1246c9410059ddf',
                price: 24,
            },
        ],
        defaultPriceAndSize: {
            size: '6380fd9da1246c9410059ddf',
            price: 24,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Cappy Pulpy',
                description: 'Cappy Pulpy',
            },
            ru: {
                name: 'Cappy Pulpy',
                description: 'Cappy Pulpy',
            },
            en: {
                name: 'Cappy Pulpy',
                description: 'Cappy Pulpy',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314623526261f60afd97f8b'),
        publicId: 'bautura-racoritoare-cappy-pulpy-cu-14-suc-de-portocale-033l-8858154991646-_-1587152247_xs9d4d',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662285295/bautura-racoritoare-cappy-pulpy-cu-14-suc-de-portocale-033l-8858154991646-_-1587152247_xs9d4d.png',
    },
    {
        _id: new mongoose.Types.ObjectId('6314747f254d524cfbeac3a1'),
        pricesAndSizes: [
            {
                size: '6380fd9da1246c9410059ddd',
                price: 12,
            },
            {
                size: '6380fd9da1246c9410059dde',
                price: 18,
            },
            {
                size: '6380fd9da1246c9410059ddf',
                price: 24,
            },
        ],
        defaultPriceAndSize: {
            size: '6380fd9da1246c9410059ddf',
            price: 24,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Băutura Tymbark',
                description: 'Băutura Tymbark',
            },
            ru: {
                name: 'Напиток Tymbark',
                description: 'Напиток Tymbark',
            },
            en: {
                name: 'Cappy Pulpy',
                description: 'Cappy Pulpy',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314623526261f60afd97f8b'),
        publicId: 'large-tymbarkgbapplemint-removebg-preview-_-1587153047_dcgbgm',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662285405/large-tymbarkgbapplemint-removebg-preview-_-1587153047_dcgbgm.png',
    },

    // Wines
    {
        _id: new mongoose.Types.ObjectId('63147a7790fd2cf221ce52e7'),
        pricesAndSizes: [
            {
                size: '63810ffda1246c9410059de0',
                price: 360,
            },
        ],
        defaultPriceAndSize: {
            size: '63810ffda1246c9410059de0',
            price: 360,
        },
        status: {
            onlineMenu: false,
            offlineMenu: false,
        },
        translations: {
            ro: {
                name: 'Bad Boys Carpe Diem',
                description: 'Bad Boys Carpe Diem',
            },
            ru: {
                name: 'Bad Boys Carpe Diem',
                description: 'Bad Boys Carpe Diem',
            },
            en: {
                name: 'Bad Boys Carpe Diem',
                description: 'Bad Boys Carpe Diem',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314622cae2dc4a76673563a'),
        publicId: '56399e887d2546f19769cb48d9bd4e60_big_x3bowv',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662286427/56399e887d2546f19769cb48d9bd4e60_big_x3bowv.jpg',
    },
    {
        _id: new mongoose.Types.ObjectId('63147ac335ba029afa7d1785'),
        pricesAndSizes: [
            {
                size: '63810ffda1246c9410059de0',
                price: 360,
            },
        ],
        defaultPriceAndSize: {
            size: '63810ffda1246c9410059de0',
            price: 360,
        },
        status: {
            onlineMenu: false,
            offlineMenu: false,
        },
        translations: {
            ro: {
                name: 'Fume Blanc Crama Mircești',
                description: 'Fume Blanc Crama Mircești',
            },
            ru: {
                name: 'Fume Blanc Crama Mircești',
                description: 'Fume Blanc Crama Mircești',
            },
            en: {
                name: 'Fume Blanc Crama Mircești',
                description: 'Fume Blanc Crama Mircești',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314622cae2dc4a76673563a'),
        publicId: 'fd202ffe3b46474189b1a50ff3921ba9_big_qetclw',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662286845/fd202ffe3b46474189b1a50ff3921ba9_big_qetclw.jpg',
    },
    {
        _id: new mongoose.Types.ObjectId('63147acd956074622bf81f2f'),
        pricesAndSizes: [
            {
                size: '63810ffda1246c9410059de0',
                price: 360,
            },
        ],
        defaultPriceAndSize: {
            size: '63810ffda1246c9410059de0',
            price: 360,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Pinot Noir Crama Mircești',
                description: 'Pinot Noir Crama Mircești',
            },
            ru: {
                name: 'Pinot Noir Crama Mircești',
                description: 'Pinot Noir Crama Mircești',
            },
            en: {
                name: 'Pinot Noir Crama Mircești',
                description: 'Pinot Noir Crama Mircești',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314622cae2dc4a76673563a'),
        publicId: '121a73fa0d7b419197bc6426c37d24d7_big_lol5na',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662286939/121a73fa0d7b419197bc6426c37d24d7_big_lol5na.jpg',
    },
    {
        _id: new mongoose.Types.ObjectId('63147ca6ad6f65c3eaf0a88b'),
        pricesAndSizes: [
            {
                size: '63810ffda1246c9410059de0',
                price: 360,
            },
        ],
        defaultPriceAndSize: {
            size: '63810ffda1246c9410059de0',
            price: 360,
        },
        status: {
            onlineMenu: true,
            offlineMenu: true,
        },
        translations: {
            ro: {
                name: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
                description: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
            },
            ru: {
                name: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
                description: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
            },
            en: {
                name: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
                description: 'Fautor Aurore Feteasca Neagra & Rara Neagra',
            },
        },
        recommendedProducts: [],
        category: new mongoose.Types.ObjectId('6314622cae2dc4a76673563a'),
        publicId: 'ab82a3fc3aca473ea3e5c7da97356ff4_big_rhrqwq',
        imageUrl:
            'https://res.cloudinary.com/dyv3ttobe/image/upload/v1662287069/ab82a3fc3aca473ea3e5c7da97356ff4_big_rhrqwq.jpg',
    },
];

export const localities: ILocality[] = [
    {
        _id: new mongoose.Types.ObjectId('6376c5c260552c294703f66f'),
        name: 'Chișinău',
        deliveryCost: 50,
    },
    {
        _id: new mongoose.Types.ObjectId('6376c5c260552c294703f670'),
        name: 'Stăuceni',
        deliveryCost: 70,
    },
    {
        _id: new mongoose.Types.ObjectId('6376c60a60552c294703f671'),
        name: 'Băuceni',
        deliveryCost: 80,
    },
    {
        _id: new mongoose.Types.ObjectId('6376c60a60552c294703f672'),
        name: 'Durlești',
        deliveryCost: 60,
    },
];
