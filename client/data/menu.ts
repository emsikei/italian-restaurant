// // import { ICategory } from '../types/category';

// // const menu: ICategory[] = [
// //     {
// //         _id: '633876ade26452c4d2057551',
// //         slug: 'pizza',
// //         translations: {
// //             ro: {
// //                 name: 'Pizza',
// //             },
// //             ru: {
// //                 name: 'Пицца',
// //             },
// //             en: {
// //                 name: 'Pizza',
// //             },
// //         },
// //         products: [
// //             {
// //                 _id: '1',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza 1',
// //                         description: 'Descriptie pentru Pizza 1',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 1',
// //                         description: 'Описание для Пиццы 1',
// //                     },
// //                     en: {
// //                         name: 'Pizza 1',
// //                         description: 'Description for Pizza 1',
// //                     },
// //                 },
// //                 discount: 20,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [
// //                     {
// //                         _id: '3',
// //                         translations: {
// //                             ro: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Descriptie pentru Pizza 3',
// //                             },
// //                             ru: {
// //                                 name: 'Пицца 3',
// //                                 description: 'Описание для Пиццы 3',
// //                             },
// //                             en: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Description for Pizza 3',
// //                             },
// //                         },
// //                         discount: 15,
// //                         status: {
// //                             onlineMenu: true,
// //                             offlineMenu: true,
// //                         },
// //                         defaultSize: {
// //                             translations: {
// //                                 ro: {
// //                                     value: '500 g',
// //                                 },
// //                                 en: {
// //                                     value: '500 g',
// //                                 },
// //                                 ru: {
// //                                     value: '500 г',
// //                                 },
// //                             },
// //                             price: 200,
// //                         },
// //                         pricesAndSizes: [
// //                             {
// //                                 translations: {
// //                                     ro: {
// //                                         value: '1000 g',
// //                                     },
// //                                     en: {
// //                                         value: '1000 g',
// //                                     },
// //                                     ru: {
// //                                         value: '1000 г',
// //                                     },
// //                                 },
// //                                 price: 350,
// //                             },
// //                         ],
// //                         recommendedProducts: [],
// //                         imageUrl: '/assets/images/products/pizza/example-3.webp',
// //                     },
// //                     {
// //                         _id: '5',
// //                         translations: {
// //                             ro: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Descriptie pentru Pizza 3',
// //                             },
// //                             ru: {
// //                                 name: 'Пицца 3',
// //                                 description: 'Описание для Пиццы 3',
// //                             },
// //                             en: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Description for Pizza 3',
// //                             },
// //                         },
// //                         discount: 0,
// //                         status: {
// //                             onlineMenu: true,
// //                             offlineMenu: true,
// //                         },
// //                         defaultSize: {
// //                             translations: {
// //                                 ro: {
// //                                     value: '500 g',
// //                                 },
// //                                 en: {
// //                                     value: '500 g',
// //                                 },
// //                                 ru: {
// //                                     value: '500 г',
// //                                 },
// //                             },
// //                             price: 200,
// //                         },
// //                         pricesAndSizes: [
// //                             {
// //                                 translations: {
// //                                     ro: {
// //                                         value: '1000 g',
// //                                     },
// //                                     en: {
// //                                         value: '1000 g',
// //                                     },
// //                                     ru: {
// //                                         value: '1000 г',
// //                                     },
// //                                 },
// //                                 price: 350,
// //                             },
// //                         ],
// //                         recommendedProducts: [],
// //                         imageUrl: '/assets/images/products/pizza/example-1.webp',
// //                     },
// //                     {
// //                         _id: '1',
// //                         translations: {
// //                             ro: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Descriptie pentru Pizza 3',
// //                             },
// //                             ru: {
// //                                 name: 'Пицца 3',
// //                                 description: 'Описание для Пиццы 3',
// //                             },
// //                             en: {
// //                                 name: 'Pizza 3',
// //                                 description: 'Description for Pizza 3',
// //                             },
// //                         },
// //                         discount: 0,
// //                         status: {
// //                             onlineMenu: true,
// //                             offlineMenu: true,
// //                         },
// //                         defaultSize: {
// //                             translations: {
// //                                 ro: {
// //                                     value: '500 g',
// //                                 },
// //                                 en: {
// //                                     value: '500 g',
// //                                 },
// //                                 ru: {
// //                                     value: '500 г',
// //                                 },
// //                             },
// //                             price: 200,
// //                         },
// //                         pricesAndSizes: [
// //                             {
// //                                 translations: {
// //                                     ro: {
// //                                         value: '1000 g',
// //                                     },
// //                                     en: {
// //                                         value: '1000 g',
// //                                     },
// //                                     ru: {
// //                                         value: '1000 г',
// //                                     },
// //                                 },
// //                                 price: 350,
// //                             },
// //                         ],
// //                         recommendedProducts: [],
// //                         imageUrl: '/assets/images/products/pizza/example-1.webp',
// //                     },
// //                 ],
// //                 imageUrl: '/assets/images/products/pizza/example-8.webp',
// //             },
// //             {
// //                 _id: '2',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza 2',
// //                         description: 'Descriptie pentru Pizza 2',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 2',
// //                         description: 'Описание для Пиццы 2',
// //                     },
// //                     en: {
// //                         name: 'Pizza 2',
// //                         description: 'Description for Pizza 2',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-2.webp',
// //             },
// //             {
// //                 _id: '3',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza 3',
// //                         description: 'Descriptie pentru Pizza 3',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 3',
// //                         description: 'Описание для Пиццы 3',
// //                     },
// //                     en: {
// //                         name: 'Pizza 3',
// //                         description: 'Description for Pizza 3',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-3.webp',
// //             },
// //             {
// //                 _id: '4',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza 4',
// //                         description: 'Descriptie pentru Pizza 4',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 4',
// //                         description: 'Описание для Пиццы 4',
// //                     },
// //                     en: {
// //                         name: 'Pizza 4',
// //                         description: 'Description for Pizza 4',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-4.webp',
// //             },
// //             {
// //                 _id: '5',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza 5',
// //                         description: 'Descriptie pentru Pizza 5',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 5',
// //                         description: 'Описание для Пиццы 5',
// //                     },
// //                     en: {
// //                         name: 'Pizza 5',
// //                         description: 'Description for Pizza 5',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-1.webp',
// //             },
// //         ],
// //     },
// //     {
// //         _id: '633876ade26452c4d2057552',
// //         slug: 'pizza-mix',
// //         translations: {
// //             ro: {
// //                 name: 'Pizza mixtă',
// //             },
// //             ru: {
// //                 name: 'Пицца микс',
// //             },
// //             en: {
// //                 name: 'Pizza mix',
// //             },
// //         },
// //         products: [
// //             {
// //                 _id: '1',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 1',
// //                         description: 'Descripție pentru Pizza 1',
// //                     },
// //                     ru: {
// //                         name: 'Пицца микс 1',
// //                         description: 'Описание для Пиццы 1',
// //                     },
// //                     en: {
// //                         name: 'Pizza mix 1',
// //                         description: 'Description for Pizza 1',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-7.webp',
// //             },
// //             {
// //                 _id: '2',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 2',
// //                         description: 'Descripție pentru Pizza 2',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 2',
// //                         description: 'Описание для Пиццы 2',
// //                     },
// //                     en: {
// //                         name: 'Pizza 2',
// //                         description: 'Description for Pizza 2',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-8.webp',
// //             },
// //             {
// //                 _id: '3',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 2',
// //                         description: 'Descripție pentru Pizza 3',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 3',
// //                         description: 'Описание для Пиццы 3',
// //                     },
// //                     en: {
// //                         name: 'Pizza 3',
// //                         description: 'Description for Pizza 3',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-10.webp',
// //             },
// //             {
// //                 _id: '4',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 4',
// //                         description: 'Descriptie pentru Pizza 4',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 4',
// //                         description: 'Описание для Пиццы 4',
// //                     },
// //                     en: {
// //                         name: 'Pizza 4',
// //                         description: 'Description for Pizza 4',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-12.webp',
// //             },
// //             {
// //                 _id: '5',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 5',
// //                         description: 'Descriptie pentru Pizza 5',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 5',
// //                         description: 'Описание для Пиццы 5',
// //                     },
// //                     en: {
// //                         name: 'Pizza 5',
// //                         description: 'Description for Pizza 5',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-2.webp',
// //             },
// //             {
// //                 _id: '6',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 6',
// //                         description: 'Descriptie pentru Pizza 6',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 6',
// //                         description: 'Описание для Пиццы 6',
// //                     },
// //                     en: {
// //                         name: 'Pizza 6',
// //                         description: 'Description for Pizza 6',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-3.webp',
// //             },
// //         ],
// //     },
// //     {
// //         _id: '633876ade26452c4d2157552',
// //         slug: 'wine-red',
// //         translations: {
// //             ro: {
// //                 name: 'Vin rosu',
// //             },
// //             ru: {
// //                 name: 'Красное вино',
// //             },
// //             en: {
// //                 name: 'Red wine',
// //             },
// //         },
// //         products: [
// //             {
// //                 _id: '1',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 1',
// //                         description: 'Descripție pentru Pizza 1',
// //                     },
// //                     ru: {
// //                         name: 'Пицца микс 1',
// //                         description: 'Описание для Пиццы 1',
// //                     },
// //                     en: {
// //                         name: 'Pizza mix 1',
// //                         description: 'Description for Pizza 1',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-7.webp',
// //             },
// //             {
// //                 _id: '2',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 2',
// //                         description: 'Descripție pentru Pizza 2',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 2',
// //                         description: 'Описание для Пиццы 2',
// //                     },
// //                     en: {
// //                         name: 'Pizza 2',
// //                         description: 'Description for Pizza 2',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-8.webp',
// //             },
// //             {
// //                 _id: '3',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 2',
// //                         description: 'Descripție pentru Pizza 3',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 3',
// //                         description: 'Описание для Пиццы 3',
// //                     },
// //                     en: {
// //                         name: 'Pizza 3',
// //                         description: 'Description for Pizza 3',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-10.webp',
// //             },
// //             {
// //                 _id: '4',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 4',
// //                         description: 'Descriptie pentru Pizza 4',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 4',
// //                         description: 'Описание для Пиццы 4',
// //                     },
// //                     en: {
// //                         name: 'Pizza 4',
// //                         description: 'Description for Pizza 4',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-12.webp',
// //             },
// //             {
// //                 _id: '5',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 5',
// //                         description: 'Descriptie pentru Pizza 5',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 5',
// //                         description: 'Описание для Пиццы 5',
// //                     },
// //                     en: {
// //                         name: 'Pizza 5',
// //                         description: 'Description for Pizza 5',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-2.webp',
// //             },
// //             {
// //                 _id: '6',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 6',
// //                         description: 'Descriptie pentru Pizza 6',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 6',
// //                         description: 'Описание для Пиццы 6',
// //                     },
// //                     en: {
// //                         name: 'Pizza 6',
// //                         description: 'Description for Pizza 6',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-3.webp',
// //             },
// //         ],
// //     },
// //     {
// //         _id: '633876ade26552c4d2157552',
// //         slug: 'wine-white',
// //         translations: {
// //             ro: {
// //                 name: 'Vin alb',
// //             },
// //             ru: {
// //                 name: 'Белое вино',
// //             },
// //             en: {
// //                 name: 'White wine',
// //             },
// //         },
// //         products: [
// //             {
// //                 _id: '1',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 1',
// //                         description: 'Descripție pentru Pizza 1',
// //                     },
// //                     ru: {
// //                         name: 'Пицца микс 1',
// //                         description: 'Описание для Пиццы 1',
// //                     },
// //                     en: {
// //                         name: 'Pizza mix 1',
// //                         description: 'Description for Pizza 1',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-7.webp',
// //             },
// //             {
// //                 _id: '2',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 2',
// //                         description: 'Descripție pentru Pizza 2',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 2',
// //                         description: 'Описание для Пиццы 2',
// //                     },
// //                     en: {
// //                         name: 'Pizza 2',
// //                         description: 'Description for Pizza 2',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-8.webp',
// //             },
// //             {
// //                 _id: '3',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 2',
// //                         description: 'Descripție pentru Pizza 3',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 3',
// //                         description: 'Описание для Пиццы 3',
// //                     },
// //                     en: {
// //                         name: 'Pizza 3',
// //                         description: 'Description for Pizza 3',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-10.webp',
// //             },
// //             {
// //                 _id: '4',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 4',
// //                         description: 'Descriptie pentru Pizza 4',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 4',
// //                         description: 'Описание для Пиццы 4',
// //                     },
// //                     en: {
// //                         name: 'Pizza 4',
// //                         description: 'Description for Pizza 4',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-12.webp',
// //             },
// //             {
// //                 _id: '5',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 5',
// //                         description: 'Descriptie pentru Pizza 5',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 5',
// //                         description: 'Описание для Пиццы 5',
// //                     },
// //                     en: {
// //                         name: 'Pizza 5',
// //                         description: 'Description for Pizza 5',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-2.webp',
// //             },
// //             {
// //                 _id: '6',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 6',
// //                         description: 'Descriptie pentru Pizza 6',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 6',
// //                         description: 'Описание для Пиццы 6',
// //                     },
// //                     en: {
// //                         name: 'Pizza 6',
// //                         description: 'Description for Pizza 6',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-3.webp',
// //             },
// //         ],
// //     },
// //     {
// //         _id: '633876ade26552c432157552',
// //         slug: 'wine-rose',
// //         translations: {
// //             ro: {
// //                 name: 'Vin rose',
// //             },
// //             ru: {
// //                 name: 'Розовое вино',
// //             },
// //             en: {
// //                 name: 'Rose wine',
// //             },
// //         },
// //         products: [
// //             {
// //                 _id: '1',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 1',
// //                         description: 'Descripție pentru Pizza 1',
// //                     },
// //                     ru: {
// //                         name: 'Пицца микс 1',
// //                         description: 'Описание для Пиццы 1',
// //                     },
// //                     en: {
// //                         name: 'Pizza mix 1',
// //                         description: 'Description for Pizza 1',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-7.webp',
// //             },
// //             {
// //                 _id: '2',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixtă 2',
// //                         description: 'Descripție pentru Pizza 2',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 2',
// //                         description: 'Описание для Пиццы 2',
// //                     },
// //                     en: {
// //                         name: 'Pizza 2',
// //                         description: 'Description for Pizza 2',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-8.webp',
// //             },
// //             {
// //                 _id: '3',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 2',
// //                         description: 'Descripție pentru Pizza 3',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 3',
// //                         description: 'Описание для Пиццы 3',
// //                     },
// //                     en: {
// //                         name: 'Pizza 3',
// //                         description: 'Description for Pizza 3',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-10.webp',
// //             },
// //             {
// //                 _id: '4',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 4',
// //                         description: 'Descriptie pentru Pizza 4',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 4',
// //                         description: 'Описание для Пиццы 4',
// //                     },
// //                     en: {
// //                         name: 'Pizza 4',
// //                         description: 'Description for Pizza 4',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-12.webp',
// //             },
// //             {
// //                 _id: '5',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 5',
// //                         description: 'Descriptie pentru Pizza 5',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 5',
// //                         description: 'Описание для Пиццы 5',
// //                     },
// //                     en: {
// //                         name: 'Pizza 5',
// //                         description: 'Description for Pizza 5',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-2.webp',
// //             },
// //             {
// //                 _id: '6',
// //                 translations: {
// //                     ro: {
// //                         name: 'Pizza mixta 6',
// //                         description: 'Descriptie pentru Pizza 6',
// //                     },
// //                     ru: {
// //                         name: 'Пицца 6',
// //                         description: 'Описание для Пиццы 6',
// //                     },
// //                     en: {
// //                         name: 'Pizza 6',
// //                         description: 'Description for Pizza 6',
// //                     },
// //                 },
// //                 discount: 0,
// //                 status: {
// //                     onlineMenu: true,
// //                     offlineMenu: true,
// //                 },
// //                 defaultSize: {
// //                     translations: {
// //                         ro: {
// //                             value: '500 g',
// //                         },
// //                         en: {
// //                             value: '500 g',
// //                         },
// //                         ru: {
// //                             value: '500 г',
// //                         },
// //                     },
// //                     price: 200,
// //                 },
// //                 pricesAndSizes: [
// //                     {
// //                         translations: {
// //                             ro: {
// //                                 value: '1000 g',
// //                             },
// //                             en: {
// //                                 value: '1000 g',
// //                             },
// //                             ru: {
// //                                 value: '1000 г',
// //                             },
// //                         },
// //                         price: 350,
// //                     },
// //                 ],
// //                 recommendedProducts: [],
// //                 imageUrl: '/assets/images/products/pizza/example-3.webp',
// //             },
// //         ],
// //     },
// // ];

// // export default menu;

// const menu: string[] = [];

// export default menu;
