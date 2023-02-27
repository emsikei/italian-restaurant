import { body } from 'express-validator';

export const sizeCreateValidationRules = () => [
    body().notEmpty().withMessage('Body is required'),
    body('translations.ro.value').notEmpty().withMessage('RO: value is required'),
    body('translations.ru.value').notEmpty().withMessage('RU: value is required'),
    body('translations.en.value').notEmpty().withMessage('EN: value is required'),
];

export const sizeUpdateValidationRules = () => [
    body().notEmpty().withMessage('Body is required'),
    body('_id').notEmpty().withMessage('Id is required'),
    body('translations.ro.value').notEmpty().withMessage('RO: value is required'),
    body('translations.ru.value').notEmpty().withMessage('RU: value is required'),
    body('translations.en.value').notEmpty().withMessage('EN: value is required'),
];
