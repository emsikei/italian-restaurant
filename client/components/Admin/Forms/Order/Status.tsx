import { OrderStatus } from '../../../../types/order';

interface IStatusProps {
    status?: OrderStatus;
}

const Status = ({ status }: IStatusProps) => (
    <div>
        {status === 'PENDING' && <p className="bg-amber-400 p-2 text-center rounded-md text-white">PENDING</p>}
        {status === 'ACCEPTED' && <p className="bg-green-500 p-2 text-center rounded-md text-white">ACCEPTAT</p>}
        {status === 'FINISHED' && <p className="bg-cyan-500 p-2 text-center rounded-md text-white">FINISHED</p>}
        {status === 'CANCELED' && <p className="bg-red-500 p-2 text-center rounded-md text-white">CANCELED</p>}
    </div>
);
export default Status;
