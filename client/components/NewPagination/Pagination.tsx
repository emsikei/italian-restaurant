/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { generateUUID } from '../../helpers';
import { DOTS, usePagination } from '../../hooks/usePagination';
import NavigationButton from '../Admin/Pagination/NavigationButton';

interface IPaginationProps {
    onPageChange: (page: number) => void;
    totalPages: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}

// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const Pagination = ({ onPageChange, totalPages, siblingCount = 1, currentPage, pageSize }: IPaginationProps) => {
    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange!.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange![paginationRange!.length - 1];
    return (
        <ul className="flex items-center">
            <NavigationButton type="prev" handleClick={onPrevious} />

            {paginationRange?.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={generateUUID()} className="pagination-item dots">
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={generateUUID()}
                        className={`w-8 h-8 text-sm text-center block py-1 px-2 mx-1 cursor-pointer transition-all border border-vp_brown-100 rounded-md hover:text-white hover:bg-vp_brown-100 ${
                            pageNumber === currentPage && 'text-white bg-vp_brown-100'
                        }`}
                        onClick={() => onPageChange(+pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            <NavigationButton type="next" handleClick={onNext} />
        </ul>
    );
};

export default Pagination;
