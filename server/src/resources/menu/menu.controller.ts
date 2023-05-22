import { NextFunction, Router, Request, Response } from 'express';
import IController from '@/utils/interfaces/controller.interface';
import MenuService from '@/resources/menu/menu.service';
import Logger from '../logger/logger.service';

class MenuController implements IController {
    public path: string = '/menu';

    public router: Router = Router();

    private _menuService = new MenuService();

    private _logger = Logger.getInstance();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/online-menu`, this.getOnlineMenu);

        this.router.get(`${this.path}/online-menu/:slug`, this.getOneOnline);

        this.router.get(`${this.path}/offline-menu`, this.getOfflineMenu);
    }

    private getOnlineMenu = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const menu = await this._menuService.getOnlineMenu();

            this._logger.log('Get online menu!');

            return res.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    };

    private getOfflineMenu = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const menu = await this._menuService.getOfflineMenu();

            this._logger.log('Get offline menu!');

            return res.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    };

    private getOneOnline = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { slug } = req.params;

            const category = await this._menuService.getOneOnline(slug);

            this._logger.log('Get one online menu!');

            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    };
}

export default MenuController;
