import { NextFunction, Router, Response, Request } from 'express';
import OrderService from '@/resources/order/order.service';
import { OrderCreate, OrderStatus } from '@/utils/types/order.types';
import authMiddleware from '@/middleware/auth.middleware';
import rolesMiddleware from '@/middleware/roles.middleware';
import Logger from '../logger/logger.service';

class OrderController {
    public path: string = '/orders';

    public router: Router = Router();

    private _orderService = new OrderService();

    private _logger = Logger.getInstance();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}`, this.create);
        this.router.get(`${this.path}`, authMiddleware, rolesMiddleware(['ADMIN']), this.getAllWithPagination);
        this.router.put(`${this.path}/:orderNumber`, authMiddleware, rolesMiddleware(['ADMIN']), this.changeStatus);
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {
                contact,
                address,
                deliveryType,
                deliveryTimeType,
                paymentMethod,
                comment,
                items,
                subtotal,
                total,
                deliveryCost,
            } = req.body as OrderCreate;

            const order = await this._orderService.create({
                contact,
                address,
                deliveryType,
                deliveryTimeType,
                paymentMethod,
                comment,
                items,
                subtotal,
                total,
                deliveryCost,
            });

            this._logger.log('Order created!');

            return res.status(200).json(order);
        } catch (error) {
            console.log(error);
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

            const orders = await this._orderService.getAllWithPagination(
                { page, limit },
                { status: req.query.status as string }
            );

            this._logger.log('Order get!');

            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };

    private changeStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { orderNumber } = req.params;
            const { status } = req.body as { status: OrderStatus };

            const order = await this._orderService.changeStatus(orderNumber, status);

            this._logger.log('Order status changed!');

            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };
}

export default OrderController;
