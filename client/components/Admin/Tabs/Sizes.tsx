import { useEffect, useState } from 'react';
import { FormType } from '../../../constants';
import { generateUUID } from '../../../helpers';
import useFetch from '../../../hooks/useFetch';
import { fetcher } from '../../../lib/fetcher';
import { initialSizeCreate } from '../../../states/admin';
import { QueryAdminData } from '../../../types/admin';
import { RequestError } from '../../../types/errors';
import { ISize, SizeCreate } from '../../../types/size';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Edit } from '../Buttons';
import SizeFormWrapper from '../Forms/Size/SizeFormWrapper';
import Modal from '../Modal';

const Sizes = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalSize, setModalSize] = useState<ISize | SizeCreate>(initialSizeCreate);
    const [formType, setFormType] = useState<FormType>('create');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [requestError, setRequestError] = useState<string | RequestError>('');

    const [sizes, setSizes] = useState<ISize[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const [error, fetchedData] = await fetcher<QueryAdminData<ISize[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/sizes?page=${currentPage}`
            );

            if (!error && fetchedData) {
                setSizes(fetchedData.data);
                setTotalPages(fetchedData.totalPages);
            }
            setIsLoading(false);
        };
        fetch();
    }, [currentPage]);

    if (isLoading) return <Loading />;

    return (
        <div>
            <table className="min-w-[60%]">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Valorea mărimei</th>
                        <th className="px-6 py-4">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((size, index) => (
                        <tr key={size._id} className="border-b-2">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{size.translations.ro.value}</td>
                            <td className="px-6 py-">
                                <span className="flex items-center gap-2">
                                    <Edit
                                        handleClick={() => {
                                            setFormType('edit');
                                            setModalSize(size);
                                            setModalActive(true);
                                        }}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
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

            <button
                type="button"
                onClick={() => {
                    setFormType('create');
                    setModalSize(initialSizeCreate);
                    setModalActive(true);
                }}
            >
                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                    + Adaugă mărime
                </h1>
            </button>

            <Modal active={modalActive} setActive={setModalActive}>
                <SizeFormWrapper
                    key={generateUUID()}
                    sizes={sizes}
                    setSizes={setSizes}
                    setModalActive={setModalActive}
                    size={modalSize}
                    formType={formType}
                    requestError={requestError}
                    setRequestError={setRequestError}
                />
            </Modal>
        </div>
    );
};

export default Sizes;
