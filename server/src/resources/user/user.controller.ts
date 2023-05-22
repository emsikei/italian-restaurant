import { Request, Response, NextFunction, Router } from 'express';

import IController from '@/utils/interfaces/controller.interface';
import authMiddleware from '@/middleware/auth.middleware';
import UserService from '@/resources/user/user.service';
import UserDto from '@/dtos/user.dto';
import Logger from '../logger/logger.service';

class UserController implements IController {
    public path: string = '/users';

    public router: Router = Router();

    private _userService = new UserService();

    private _logger = Logger.getInstance();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/me`, authMiddleware, this.getMe);
    }

    private getMe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this._userService.findById((req as any).user.id);

            const userDto = new UserDto(user);

            this._logger.log('User get me!');

            return res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
