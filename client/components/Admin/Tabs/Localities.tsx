import { useEffect, useState } from 'react';
import { FormType } from '../../../constants';
import { generateUUID } from '../../../helpers';
import useFetch from '../../../hooks/useFetch';
import { deleter, fetcher } from '../../../lib/fetcher';
import { initialLocalityCreate } from '../../../states/admin';
import { QueryAdminData } from '../../../types/admin';
import { RequestError } from '../../../types/errors';
import { ILocality } from '../../../types/locality';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Delete, Edit } from '../Buttons';
import Confirm from '../Confirm';
import LocalityFormWrapper from '../Forms/Locality/LocalityFormWrapper';
import Modal from '../Modal';

const Localities = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmActive, setConfirmActive] = useState<boolean>(false);
    const [modalLocality, setModalLocality] = useState<ILocality>(initialLocalityCreate);
    const [formType, setFormType] = useState<FormType>('create');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [localities, setLocalities] = useState<ILocality[]>([]);

    const [requestError, setRequestError] = useState<RequestError | string>('');

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const [error, fetchedData] = await fetcher<QueryAdminData<ILocality[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/localities?page=${currentPage}`
            );

            if (!error && fetchedData) {
                setLocalities(fetchedData.data);
                setTotalPages(fetchedData.totalPages);
            }
            setIsLoading(false);
        };
        fetch();
    }, [currentPage]);

    const handleLocalityDelete = async (id: string): Promise<void> => {
        const filtered = localities.filter((l) => l._id !== id);

        const [error, data] = await deleter(`${process.env.NEXT_PUBLIC_API_URL}/localities/${id}`);

        if (error) setRequestError(error);

        if (!error) {
            setConfirmActive(false);
            setLocalities(filtered);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <table className="min-w-[60%]">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Numele locațiunii</th>
                        <th className="px-6 py-4">Prețul livrarei</th>
                        <th className="px-6 py-4">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {localities.map((locality, index) => (
                        <tr key={locality._id} className="border-b-2">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{locality.name}</td>
                            <td className="px-6 py-4">{locality.deliveryCost} MDL</td>
                            <td className="px-6 py-">
                                <span className="flex items-center gap-2">
                                    <Edit
                                        handleClick={() => {
                                            setFormType('edit');
                                            setModalLocality(locality);
                                            setModalActive(true);
                                        }}
                                    />
                                    <Delete
                                        handleClick={() => {
                                            setModalLocality(locality);
                                            setConfirmActive(true);
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
                    setModalLocality(initialLocalityCreate);
                    setModalActive(true);
                }}
            >
                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                    + Adaugă localitate
                </h1>
            </button>

            <Modal active={confirmActive} setActive={setConfirmActive}>
                <Confirm
                    requestError={requestError}
                    value={modalLocality.name}
                    setActive={setConfirmActive}
                    handlePositiveAnswer={() => handleLocalityDelete(modalLocality._id as string)}
                />
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                <LocalityFormWrapper
                    key={generateUUID()}
                    localities={localities}
                    setLocalities={setLocalities}
                    setModalActive={setModalActive}
                    locality={modalLocality}
                    formType={formType}
                    requestError={requestError}
                    setRequestError={setRequestError}
                />
            </Modal>
        </div>
    );
};

export default Localities;
