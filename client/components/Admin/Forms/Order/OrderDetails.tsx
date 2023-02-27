import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/ro';
import isToday from 'dayjs/plugin/isToday';

import { Dispatch, SetStateAction } from 'react';
import { IOrder } from '../../../../types/order';
import { generateUUID } from '../../../../helpers';
import SelectStatus from './SelectStatus';

dayjs.extend(calendar);
dayjs.extend(isToday);
dayjs().format();
dayjs.locale('ro');

interface IOrderDetailsProps {
    order: IOrder;
    orders: IOrder[];
    setOrders: Dispatch<SetStateAction<IOrder[]>>;
    setOrder: Dispatch<SetStateAction<IOrder>>;
}

const OrderDetails = ({ order, setOrder, orders, setOrders }: IOrderDetailsProps) => (
    <div>
        <h2 className="font-bold text-xl tracking-wider">Detalii:</h2>
        <p className="text-vp_gray">
            <span className="font-semibold">Nr ordinului:</span> {order.orderNumber}
        </p>
        <p className="text-vp_gray">
            <span className="font-semibold">Data ordinului:</span> {dayjs(order.createdAt).format('HH:mm DD.MM.YYYY')}
        </p>
        <p className="text-vp_gray">
            <span className="font-semibold">Metoda de plată:</span> {order.paymentMethod}
        </p>
        <p className="text-vp_gray">
            <span className="font-semibold">Metoda de livrare:</span> {order.deliveryType}
        </p>
        <p className="text-vp_gray flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className="w-[120px]">
                <SelectStatus
                    order={order}
                    setOrder={setOrder}
                    orders={orders}
                    setOrders={setOrders}
                    status={order.status}
                />
            </span>
        </p>

        <h2 className="font-bold text-xl tracking-wider">Contacte:</h2>
        <p className="text-vp_gray">
            <span className="font-semibold">Nume:</span> {order.contact?.customerName}
        </p>
        <p className="text-vp_gray">
            {order.contact.email && (
                <span>
                    <span className="font-semibold">Email:</span> {order.contact?.email}
                </span>
            )}
        </p>
        <p className="text-vp_gray">
            <span className="font-semibold">Numărul de telefon:</span> {order.contact?.phoneNumber}
        </p>

        {order.deliveryType === 'COURIER' && (
            <div>
                <h2 className="font-bold text-xl tracking-wider">Adresa:</h2>
                <p className="text-vp_gray">
                    {order.address?.city && (
                        <span>
                            <span className="font-semibold">Localitate:</span> {order.address?.city}
                        </span>
                    )}
                </p>
                <p className="text-vp_gray">
                    {order.address?.street && (
                        <span>
                            <span className="font-semibold">Strada: </span>
                            {order.address?.street}
                        </span>
                    )}
                </p>
                <p className="text-vp_gray">
                    {order.address?.houseNumber && (
                        <span>
                            <span className="font-semibold">Nr casei:</span> {order.address?.houseNumber}
                        </span>
                    )}
                </p>
                <p className="text-vp_gray">
                    {order.address?.apartment && (
                        <span>
                            <span className="font-semibold">Apartament: </span>
                            {order.address?.apartment}
                        </span>
                    )}
                </p>
            </div>
        )}

        <h2 className="font-bold text-xl tracking-wider">Produse:</h2>
        {order.items?.map((item, index) => (
            <div className="flex text-vp_gray gap-2" key={generateUUID()}>
                <p className="font-semibold"> {index + 1}.</p>
                <div>
                    <p>
                        <span className="font-semibold">Nume:</span> {item.name}
                    </p>
                    <p>
                        <span className="font-semibold">Mărime:</span> {item.size}
                    </p>
                    <p>
                        <span className="font-semibold">Preț:</span> {item.price} MDL
                    </p>
                    <p>
                        <span className="font-semibold">Cantitate: </span>
                        {item.quantity}
                    </p>
                    <p>
                        <span className="font-semibold">Categorie:</span> {item.category}
                    </p>
                </div>
            </div>
        ))}

        <h2 className="font-bold text-xl tracking-wider">
            Subtotal: <span className="text-vp_gray text-sm font-normal tracking-normal">{order.subtotal} MDL</span>
        </h2>
        <h2 className="font-bold text-xl tracking-wider">
            Prețul livrării:{' '}
            <span className="text-vp_gray text-sm font-normal tracking-normal">{order.deliveryCost} MDL</span>
        </h2>
        <h2 className="font-bold text-xl tracking-wider">
            Total: <span className="text-vp_gray text-sm font-normal tracking-normal">{order.total} MDL</span>
        </h2>

        {order.comment && (
            <div>
                <h2 className="font-bold text-xl tracking-wider">Comentariu:</h2>
                <p>{order.comment}</p>
            </div>
        )}
    </div>
);

export default OrderDetails;
