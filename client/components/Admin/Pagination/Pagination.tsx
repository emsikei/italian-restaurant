import { Dispatch, SetStateAction } from 'react';
import { generateUUID } from '../../../helpers';
import NavigationButton from './NavigationButton';
import PaginationItem from './PaginationItem';

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }: IPaginationProps) => {
    const handlePrevPage = (): void => {
        if (currentPage <= 1) return;

        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = (): void => {
        if (currentPage >= totalPages) return;

        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex items-center">
            <NavigationButton type="prev" handleClick={handlePrevPage} />

            {[...Array(totalPages)].map((_, index) => (
                <PaginationItem
                    key={generateUUID()}
                    index={index}
                    currentPage={currentPage}
                    handleClick={() => setCurrentPage(index + 1)}
                />
            ))}

            <NavigationButton type="next" handleClick={handleNextPage} />
        </div>
    );
};

export default Pagination;
