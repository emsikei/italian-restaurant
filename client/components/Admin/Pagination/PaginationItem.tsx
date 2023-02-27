import { Dispatch, SetStateAction } from 'react';

interface IPaginationItemProps {
    index: number;
    currentPage: number;
    handleClick: () => void;
}

const PaginationItem = ({ currentPage, index, handleClick }: IPaginationItemProps) => (
    <button
        type="button"
        className={`w-8 h-8 text-sm text-center block py-1 px-2 mx-1 cursor-pointer transition-all border border-vp_brown-100 rounded-md hover:text-white hover:bg-vp_brown-100 ${
            currentPage === index + 1 && 'text-white bg-vp_brown-100'
        }`}
        onClick={handleClick}
    >
        {index + 1}
    </button>
);

export default PaginationItem;
