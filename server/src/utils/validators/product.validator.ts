import { body } from 'express-validator';

export const productCreateValidationRules = () => [
    body('product').notEmpty().withMessage('Body is required'),

    body('product.category').notEmpty().withMessage('Category is required'),

    body('product.defaultPriceAndSize.size').notEmpty().withMessage('Default size value is required'),
    body('product.defaultPriceAndSize.price').notEmpty().withMessage('Default size price is required'),

    body('product.translations.ro.name').notEmpty().withMessage('RO: Name is required'),
    body('product.translations.ro.description').notEmpty().withMessage('RO: Description is required'),

    body('product.translations.ru.name').notEmpty().withMessage('RU: Name is required'),
    body('product.translations.ru.description').notEmpty().withMessage('RU: Description is required'),

    body('product.translations.en.name').notEmpty().withMessage('EN: Name is required'),
    body('product.translations.en.description').notEmpty().withMessage('EN: Description is required'),
];

export const productUpdateValidationRules = () => [
    body('product').notEmpty().withMessage('Body is required'),

    body('product._id').notEmpty().withMessage('Id is required'),

    body('product.category').notEmpty().withMessage('Category is required'),
    body('product.discount').notEmpty().withMessage('Discount is required'),

    body('product.defaultPriceAndSize.size').notEmpty().withMessage('Default size value is required'),
    body('product.defaultPriceAndSize.price').notEmpty().withMessage('Default size price is required'),

    body('product.translations.ro.name').notEmpty().withMessage('RO: name is required'),
    body('product.translations.ro.description').notEmpty().withMessage('RO: Description is required'),

    body('product.translations.ru.name').notEmpty().withMessage('RU: name is required'),
    body('product.translations.ru.description').notEmpty().withMessage('RU: Description is required'),

    body('product.translations.en.name').notEmpty().withMessage('EN: name is required'),
    body('product.translations.en.description').notEmpty().withMessage('EN: Description is required'),
];
