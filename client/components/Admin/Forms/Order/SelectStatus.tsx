import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ORDER_STATUSES } from '../../../../constants';
import { generateUUID } from '../../../../helpers';
import { putter } from '../../../../lib/fetcher';
import { RequestError } from '../../../../types/errors';
import { IOrder, OrderStatus } from '../../../../types/order';

interface ISelectStatusProps {
    status?: OrderStatus;
    order: IOrder;
    orders: IOrder[];
    setOrders: Dispatch<SetStateAction<IOrder[]>>;
    setOrder: Dispatch<SetStateAction<IOrder>>;
}

const SelectStatus = ({ status, order, setOrder, orders, setOrders }: ISelectStatusProps) => {
    const [requestError, setRequestError] = useState<string | RequestError>('');

    return (
        <>
            <select
                name="status"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                onChange={async (e) => {
                    setOrder({ ...order, status: e.target.value as OrderStatus });

                    const [error, data] = await putter<IOrder>(
                        `${process.env.NEXT_PUBLIC_API_URL}/orders/${order.orderNumber}`,
                        {
                            status: e.target.value,
                        }
                    );

                    if (error) setRequestError(error);

                    if (!error) {
                        const arr = [...orders];
                        const index = arr.findIndex((o) => o._id === data?._id);
                        arr[index].status = e.target.value as OrderStatus;

                        setOrders(arr);
                    }
                }}
                value={order.status}
            >
                {ORDER_STATUSES.map((orderStatus, index) => (
                    <option value={orderStatus} key={index}>
                        {orderStatus}
                    </option>
                ))}
            </select>
            <p className="ml-1 mt-2 text-xs text-red-500">{requestError && JSON.stringify(requestError)}</p>
        </>
    );
};

export default SelectStatus;
