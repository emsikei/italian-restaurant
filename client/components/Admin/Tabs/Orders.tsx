import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { generateUUID } from '../../../helpers';
import useFetch from '../../../hooks/useFetch';
import { fetcher } from '../../../lib/fetcher';
import { initialCheckoutState } from '../../../states/order';
import { QueryAdminData } from '../../../types/admin';
import { IOrder } from '../../../types/order';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Delete, Edit } from '../Buttons';
import OrderDetails from '../Forms/Order/OrderDetails';
import Status from '../Forms/Order/Status';
import Modal from '../Modal';
import OrderFilter from '../Filter/OrderFilter';

const Orders = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalOrder, setModalOrder] = useState<IOrder>(initialCheckoutState);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [orders, setOrders] = useState<IOrder[]>([]);

    const fetchOrders = async (load: boolean): Promise<void> => {
        if (load) setIsLoading(true);
        const [error, fetchedData] = await fetcher<QueryAdminData<IOrder[]>>(
            `${process.env.NEXT_PUBLIC_API_URL}/orders?page=${currentPage}`
        );

        if (!error && fetchedData) {
            setOrders(fetchedData.data);
            setTotalPages(fetchedData.totalPages);
        }
        if (load) setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders(true);
    }, [currentPage]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders(false);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="w-full mb-5">
            {/* <OrderFilter /> */}
            <table className="">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Nr ordinului</th>
                        <th className="px-6 py-4">Contacte</th>
                        <th className="px-6 py-4">Localitate</th>
                        <th className="px-6 py-4">Metoda de plată</th>
                        <th className="px-6 py-4">Data creării</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr
                            key={order._id}
                            className="border-b-2 hover:text-stone-500 transition-all cursor-pointer"
                            onClick={() => {
                                setModalOrder(order);
                                setModalActive(true);
                            }}
                        >
                            <td className="px-6 py-4">
                                {currentPage > 1 ? (currentPage - 1) * 10 + index + 1 : index + 1}
                            </td>
                            <td className="px-6 py-4">{order.orderNumber}</td>
                            <td className="px-6 py-4">
                                <p>{order.contact.customerName}</p>
                                <p>{order.contact.phoneNumber}</p>
                                <p>{order.contact.email}</p>
                            </td>
                            <td className="px-6 py-4">{order.address ? order.address?.city : <span>RIDICARE</span>}</td>
                            <td className="px-6 py-4">{order.paymentMethod}</td>
                            <td className="px-6 py-4">{dayjs(order.createdAt).format('HH:mm DD.MM.YYYY')}</td>
                            <td className="px-6 py-4" colSpan={2}>
                                <div className="">
                                    <Status status={order.status} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>
                            <button
                                type="button"
                                onClick={() => {
                                    setModalActive(true);
                                }}
                            >
                                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                                    {/* + Adaugă ordin */}
                                </h1>
                            </button>
                        </td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td className="px-6 py-4">
                            {/* <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            /> */}
                            {/* <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                pageSize={10}
                                onPageChange={(page) => setCurrentPage(page)}
                            /> */}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="ml-3">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={10}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            <Modal active={modalActive} setActive={setModalActive}>
                <OrderDetails
                    key={generateUUID()}
                    order={modalOrder}
                    setOrder={setModalOrder}
                    orders={orders}
                    setOrders={setOrders}
                />
            </Modal>
        </div>
    );
};

export default Orders;
