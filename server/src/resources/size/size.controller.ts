import { NextFunction, Router, Request, Response } from 'express';

import IController from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';
import { SizeCreate } from '@/utils/types/size.types';
import ISize from '@/resources/size/size.interface';
import SizeService from '@/resources/size/size.service';
import { sizeCreateValidationRules } from '@/utils/validators/size.validator';

class SizeController implements IController {
    public path: string = '/sizes';

    public router: Router = Router();

    private _sizeService = new SizeService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/all`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAll);

        this.router.get(`${this.path}`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAllWithPagination);

        this.router.post(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            sizeCreateValidationRules(),
            validationMiddleware,
            this.create
        );

        this.router.put(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            sizeCreateValidationRules(),
            validationMiddleware,
            this.update
        );
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const sizes = await this._sizeService.getAll();

            return res.status(200).json(sizes);
        } catch (error) {
            next(error);
        }
    };

    private getAllWithPagination = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const banners = await this._sizeService.getAllWithPagination({ page, limit });

            return res.status(200).json(banners);
        } catch (error) {
            next(error);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { translations } = req.body as SizeCreate;

            const size = await this._sizeService.create({ translations });

            return res.status(200).json(size);
        } catch (error) {
            next(error);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id, translations } = req.body as ISize;

            const size = await this._sizeService.update({ _id, translations });

            return res.status(200).json(size);
        } catch (error) {
            next(error);
        }
    };
}

export default SizeController;
