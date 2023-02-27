import { body } from 'express-validator';

export const localityCreateValidationRules = () => [
    body('name').notEmpty().withMessage('Name is required'),
    body('deliveryCost').notEmpty().withMessage('Delivery cost is required'),
];

export const localityUpdateValidationRules = () => [
    body('_id').notEmpty().withMessage('Id is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('deliveryCost').notEmpty().withMessage('Delivery cost is required'),
];
