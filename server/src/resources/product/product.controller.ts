import { NextFunction, Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import multer from 'multer';

import IController from '@/utils/interfaces/controller.interface';
import ProductService from '@/resources/product/product.service';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import { ProductCreation, ProductUpdate } from '@/utils/types';
import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';
import parseMiddleware from '@/middleware/parse.middleware';
import { productCreateValidationRules, productUpdateValidationRules } from '@/utils/validators/product.validator';
import { booleanify } from '@/helpers/index';

const upload = multer({ dest: './src/uploads/' });

class ProductController implements IController {
    public path: string = '/products';

    public router: Router = Router();

    private _productService = new ProductService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAll);

        this.router.get(`${this.path}/:id`, this.getOne);

        this.router.post(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            upload.single('image'),
            parseMiddleware('product'),
            productCreateValidationRules(),
            validationMiddleware,
            this.create
        );

        this.router.put(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            upload.single('image'),
            parseMiddleware('product'),
            productUpdateValidationRules(),
            validationMiddleware,
            this.update
        );

        this.router.delete(`${this.path}/:id`, authMiddleware, rolesMiddleware(['ADMIN']), this.delete);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const products = await this._productService.getAll({
                page,
                limit,
                all: booleanify(req.query.all as string),
            });

            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    private getOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const product = await this._productService.getOne(id);

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (!req.file) throw HttpException.BadRequest('NO_FILE_REQUEST');

            const {
                translations,
                discount,
                recommendedProducts,
                category,
                status,
                defaultPriceAndSize,
                pricesAndSizes,
            } = req.body.product as ProductCreation;

            const newProduct = await this._productService.create(
                {
                    translations,
                    discount,
                    recommendedProducts,
                    category,
                    status,
                    defaultPriceAndSize,
                    pricesAndSizes,
                },
                req.file
            );

            return res.status(200).json(newProduct);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {
                translations,
                discount,
                recommendedProducts,
                publicId,
                imageUrl,
                category,
                _id,
                status,
                defaultPriceAndSize,
                pricesAndSizes,
            } = req.body.product as ProductUpdate;

            const updatedProduct = await this._productService.update(
                {
                    translations,
                    discount,
                    recommendedProducts,
                    publicId,
                    imageUrl,
                    category,
                    status,
                    defaultPriceAndSize,
                    pricesAndSizes,
                    _id,
                },
                req.file
            );

            return res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { id } = req.params;

            const deletedProduct = await this._productService.delete(id);

            return res.status(200).json(deletedProduct);
        } catch (error) {
            next(error);
        }
    };
}

export default ProductController;
