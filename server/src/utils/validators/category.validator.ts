import { body } from 'express-validator';

export const categoryCreateValidationRules = () => [
    body().notEmpty().withMessage('Body is required'),
    body('translations.ro.name').notEmpty().withMessage('RO: name is required'),
    body('translations.ru.name').notEmpty().withMessage('RU: Name is required'),
    body('translations.en.name').notEmpty().withMessage('EN: Name is required'),
];

export const categoryUpdateValidationRules = () => [
    body().notEmpty().withMessage('Body is required'),
    body('_id').notEmpty().withMessage('Id is required'),
    body('translations.ro.name').notEmpty().withMessage('RO: name is required'),
    body('translations.ru.name').notEmpty().withMessage('RU: Name is required'),
    body('translations.en.name').notEmpty().withMessage('EN: Name is required'),
];
