import short from 'short-uuid';

import OrderModel from '@/resources/order/order.model';
import { OrderCreate, OrderStatus, OrdersWithPagination, OrderFilter } from '@/utils/types/order.types';
import IOrder from '@/resources/order/order.interface';
import { PaginationQuery } from '@/utils/types/common.types';
import HttpException from '@/utils/exceptions/http.exception';

class OrderService {
    private _orderModel = OrderModel;

    public create = async (payload: OrderCreate): Promise<IOrder> => {
        const orderNumber = short.generate();

        const order = await this._orderModel.create({ ...payload, orderNumber });

        return order;
    };

    public getAllWithPagination = async (
        query: PaginationQuery,
        filter: OrderFilter
    ): Promise<OrdersWithPagination> => {
        const startIndex = (query.page - 1) * query.limit;

        const find: OrderFilter = {};

        if (filter.status) {
            find.status = filter.status.toUpperCase();
        }

        const total = await this._orderModel.countDocuments(find);

        const orders = await this._orderModel.find(find).sort({ createdAt: -1 }).limit(query.limit).skip(startIndex);

        return {
            data: orders,
            limit: query.limit,
            page: query.page,
            totalPages: Math.ceil(total / query.limit),
        };
    };

    public changeStatus = async (orderNumber: string, status: OrderStatus): Promise<IOrder> => {
        const order = await this._orderModel.findOneAndUpdate({ orderNumber }, { status });

        if (!order) throw HttpException.NotFound();

        return order;
    };
}

export default OrderService;
