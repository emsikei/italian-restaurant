import { FiFilter } from 'react-icons/fi';

const OrderFilter = () => (
    <div className="flex items-center gap-2 hover:text-black transition-all cursor-pointer">
        <span>
            <FiFilter />
        </span>
        <span>Filtru</span>
    </div>
);

export default OrderFilter;
