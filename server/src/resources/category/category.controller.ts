import { NextFunction, Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import IController from '@/utils/interfaces/controller.interface';

import CategoryService from '@/resources/category/category.service';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import { CategoryCreation, CategoryUpdate } from '@/utils/types';
import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';
import { slugify } from '@/helpers/index';
import { categoryCreateValidationRules, categoryUpdateValidationRules } from '@/utils/validators/category.validator';

class CategoryController implements IController {
    public path: string = '/categories';

    public router: Router = Router();

    private _categoryService = new CategoryService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAllWithPagination);

        this.router.get(`${this.path}/names`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAllCategoryNames);

        this.router.get(`${this.path}/slugs`, this.getAllCategorySlugs);

        this.router.post(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            categoryCreateValidationRules(),
            validationMiddleware,
            this.create
        );

        this.router.put(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            categoryUpdateValidationRules(),
            validationMiddleware,
            this.update
        );

        this.router.delete(`${this.path}/:id`, authMiddleware, rolesMiddleware(['ADMIN']), this.delete);
    }

    private getAllWithPagination = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const categories = await this._categoryService.getAllWithPagination({ page, limit });

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    };

    private getAllCategoryNames = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const categories = await this._categoryService.getAllCategoryNames();

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    };

    private getAllCategorySlugs = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const slugs = await this._categoryService.getAllCategorySlugs();

            return res.status(200).json(slugs);
        } catch (error) {
            next(error);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { translations } = req.body as CategoryCreation;

            const slug = slugify(translations.en.name);

            const newCategory = await this._categoryService.create({
                translations,
                slug,
            });

            return res.status(200).json(newCategory);
        } catch (error) {
            next(error);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { translations, _id } = req.body as CategoryUpdate;

            const slug = slugify(translations.en.name);

            const updatedCategory = await this._categoryService.update({
                translations,
                slug,
                _id,
            });

            if (!updatedCategory) {
                return next(HttpException.NotFound());
            }

            return res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { id } = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(HttpException.NotFound());
            }

            const deletedCategory = await this._categoryService.delete(id);

            if (!deletedCategory) {
                return next(HttpException.NotFound());
            }

            return res.status(200).json(deletedCategory);
        } catch (error) {
            next(error);
        }
    };
}

export default CategoryController;
