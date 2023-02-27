import { FiImage } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import { GiWeightCrush } from 'react-icons/gi';
import { TbPizza } from 'react-icons/tb';
import { MdRestaurantMenu, MdLocationCity } from 'react-icons/md';
import { SidebarOption } from '../types/admin';
import { CategoryCreate } from '../types/category';
import { ILocality } from '../types/locality';
import {
    BannerValidationErrors,
    CategoryValidationErrors,
    LocalityValidationErrors,
    ProductValidationErrors,
    SizeValidationErrors,
} from '../types/validation';
import { IProduct, ProductCreate } from '../types/product';
import { SizeCreate } from '../types/size';

export const sidebarOptions: SidebarOption[] = [
    {
        name: 'Localitățile',
        slug: 'localities',
        icon: <MdLocationCity />,
    },
    {
        name: 'Banere',
        slug: 'banners',
        icon: <FiImage />,
    },
    {
        name: 'Mărimile',
        slug: 'sizes',
        icon: <GiWeightCrush />,
    },
    {
        name: 'Producte',
        slug: 'products',
        icon: <TbPizza />,
    },
    {
        name: 'Categoriile',
        slug: 'categories',
        icon: <MdRestaurantMenu />,
    },
    {
        name: 'Ordinile',
        slug: 'orders',
        icon: <HiOutlineTicket />,
    },
];

export const initialCategoryCreate: CategoryCreate = {
    translations: {
        ro: {
            name: '',
        },
        en: {
            name: '',
        },
        ru: {
            name: '',
        },
    },
};

export const initialLocalityCreate: ILocality = {
    name: '',
    deliveryCost: 0,
};

export const initialCategoryValidationErrors: CategoryValidationErrors = {
    translations: {
        ro: {
            name: '',
        },
        en: {
            name: '',
        },
        ru: {
            name: '',
        },
    },
};

export const initialLocalityValidationErrors: LocalityValidationErrors = {
    name: '',
    deliveryCost: '',
};

export const initialProductState: IProduct = {
    // defaultPriceAndSize: {},
    pricesAndSizes: [
        // {
        //     size: {
        //         _id: generateUUID(),
        //         translations: {
        //             ro: {
        //                 value: '500 g',
        //             },
        //             en: {
        //                 value: '500 g',
        //             },
        //             ru: {
        //                 value: '500 г',
        //             },
        //         },
        //     },
        //     price: 200,
        // },
        // {
        //     size: {
        //         _id: generateUUID(),
        //         translations: {
        //             ro: {
        //                 value: '1000 g',
        //             },
        //             en: {
        //                 value: '1000 g',
        //             },
        //             ru: {
        //                 value: '1000 г',
        //             },
        //         },
        //     },
        //     price: 400,
        // },
    ],
    translations: {
        ro: {
            name: '',
            description: '',
        },
        en: {
            name: '',
            description: '',
        },
        ru: {
            name: '',
            description: '',
        },
    },
    category: {
        translations: {
            ro: {
                name: '',
            },
            ru: {
                name: '',
            },
            en: {
                name: '',
            },
        },
    },
    discount: 0,
    status: {
        onlineMenu: true,
        offlineMenu: true,
    },
    publicId: '',
    imageUrl: '',
    recommendedProducts: [],
};

export const initialProductValidationErrors: ProductValidationErrors = {
    translations: {
        ro: {
            name: '',
            description: '',
        },
        en: {
            name: '',
            description: '',
        },
        ru: {
            name: '',
            description: '',
        },
    },
    category: '',
    image: '',
    defaultPriceAndSize: '',
    pricesAndSizes: '',
};

export const initialSizeCreate: SizeCreate = {
    translations: {
        ro: {
            value: '',
        },
        en: {
            value: '',
        },
        ru: {
            value: '',
        },
    },
};

export const initialSizeValidationErrors: SizeValidationErrors = {
    translations: {
        ro: {
            value: '',
        },
        en: {
            value: '',
        },
        ru: {
            value: '',
        },
    },
};

export const initialBannerValidationErrors: BannerValidationErrors = {
    banner: '',
};
