import { NextFunction, Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import IController from '@/utils/interfaces/controller.interface';

import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';

import LocalityService from '@/resources/locality/locality.service';
import { LocalityCreation } from '@/utils/types/locality.types';
import ILocality from '@/resources/locality/locality.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import { localityCreateValidationRules, localityUpdateValidationRules } from '@/utils/validators/locality.validator';

class LocalityController implements IController {
    public path: string = '/localities';

    public router: Router = Router();

    private _localityService = new LocalityService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/all`, this.getAll);

        this.router.get(`${this.path}`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAllWithPagination);

        this.router.post(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            localityCreateValidationRules(),
            validationMiddleware,
            this.create
        );

        this.router.put(
            `${this.path}`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            localityUpdateValidationRules(),
            validationMiddleware,
            this.update
        );

        this.router.delete(`${this.path}/:id`, authMiddleware, rolesMiddleware(['ADMIN']), this.deleteOne);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const localities = await this._localityService.getAll();
            return res.status(200).json(localities);
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
            const localities = await this._localityService.getAllWithPagination({ page, limit });

            return res.status(200).json(localities);
        } catch (error) {
            next(error);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { name, deliveryCost } = req.body as LocalityCreation;
            const locality = await this._localityService.create({ name, deliveryCost });
            return res.status(200).json(locality);
        } catch (error) {
            next(error);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id, name, deliveryCost } = req.body as ILocality;
            const locality = await this._localityService.update({ _id, name, deliveryCost });
            return res.status(200).json(locality);
        } catch (error) {
            next(error);
        }
    };

    private deleteOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(HttpException.NotFound());
            }

            const locality = await this._localityService.deleteOne(id);
            return res.status(200).json(locality);
        } catch (error) {
            next(error);
        }
    };
}

export default LocalityController;
