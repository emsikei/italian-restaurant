import { body } from 'express-validator';

export const userRegisterValidationRules = () => [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('This is not an email'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 14 })
        .withMessage('Password should be between 8 and 14 characters long'),
];

export const userLoginValidationRules = () => [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('This is not an email'),
    body('password').notEmpty().withMessage('Password is required'),
];

export const userChangePasswordValidationRules = () => [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('This is not an email'),
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 8, max: 14 })
        .withMessage('New password should be between 8 and 14 characters long'),
];

export const userResetPasswordEmailValidationRules = () => [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('This is not an email'),
];

export const userResetPasswordValidationRules = () => [
    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 8, max: 14 })
        .withMessage('New password should be between 8 and 14 characters long'),
    body('token').notEmpty().withMessage('Token is required'),
];
