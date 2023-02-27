import { NextFunction, Router, Request, Response } from 'express';
import IController from '@/utils/interfaces/controller.interface';
import MenuService from '@/resources/menu/menu.service';

class MenuController implements IController {
    public path: string = '/menu';

    public router: Router = Router();

    private _menuService = new MenuService();

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

            return res.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    };

    private getOfflineMenu = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const menu = await this._menuService.getOfflineMenu();

            return res.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    };

    private getOneOnline = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { slug } = req.params;

            const category = await this._menuService.getOneOnline(slug);

            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    };
}

export default MenuController;
