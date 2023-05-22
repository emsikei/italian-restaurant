import { NextFunction, Router, Response, Request } from 'express';
import multer from 'multer';
import IController from '@/utils/interfaces/controller.interface';
import BannerService from '@/resources/banner/banner.service';
import HttpException from '@/utils/exceptions/http.exception';
import BannerDto from '@/dtos/banner.dto';
import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';
import Logger from '../logger/logger.service';

const upload = multer({ dest: './src/uploads/' });

class BannerController implements IController {
    public path: string = '/banners';

    public router: Router = Router();

    private _bannerService = new BannerService();

    private _logger = Logger.getInstance();

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
            upload.single('banner'),
            this.uploadOne
        );

        this.router.put(
            `${this.path}/:publicId`,
            authMiddleware,
            rolesMiddleware(['ADMIN']),
            upload.single('banner'),
            this.updateOne
        );

        this.router.delete(`${this.path}/:publicId`, authMiddleware, rolesMiddleware(['ADMIN']), this.deleteOne);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const banners = await this._bannerService.getAll();

            this._logger.log('Banner get all!');

            return res.status(200).json(banners);
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
            const banners = await this._bannerService.getAllWithPagination({ page, limit });

            this._logger.log('Banner get all with pagination!');

            return res.status(200).json(banners);
        } catch (error) {
            next(error);
        }
    };

    private uploadOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (!req.file) throw HttpException.BadRequest('NO_FILE_REQUEST');

            const banner = await this._bannerService.uploadOne(req.file);

            this._logger.log('Banner upload one!');

            return res.status(200).json({ ...new BannerDto(banner) });
        } catch (error) {
            next(error);
        }
    };

    private updateOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { publicId } = req.params;

            if (!req.file) throw HttpException.BadRequest('NO_FILE_REQUEST');

            const banner = await this._bannerService.updateOne(publicId, req.file);

            this._logger.log('Banner update one!');

            return res.status(200).json(banner);
        } catch (error) {
            next(error);
        }
    };

    private deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { publicId } = req.params;

            const banner = await this._bannerService.deleteOne(publicId);

            this._logger.log('Banner delete one!');

            return res.status(200).json(banner);
        } catch (error) {
            next(error);
        }
    };
}

export default BannerController;
