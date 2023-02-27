import { useEffect, useState } from 'react';
import { FormType } from '../../../constants';
import { copyObject, generateUUID } from '../../../helpers';
import { fetcher } from '../../../lib/fetcher';
import { initialCategoryCreate } from '../../../states/admin';
import { QueryAdminData } from '../../../types/admin';
import { ICategory } from '../../../types/category';
import { RequestError } from '../../../types/errors';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Edit } from '../Buttons';
import { CategoryFormWrapper } from '../Forms';
import Modal from '../Modal';

const Categories = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalCategory, setModalCategory] = useState<ICategory>(copyObject(initialCategoryCreate));
    const [formType, setFormType] = useState<FormType>('create');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [requestError, setRequestError] = useState<string | RequestError>('');

    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const [error, fetchedData] = await fetcher<QueryAdminData<ICategory[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/categories?page=${currentPage}`
            );

            if (!error && fetchedData) {
                setCategories(fetchedData.data);
                setTotalPages(fetchedData.totalPages);
            }
            setIsLoading(false);
        };
        fetch();
    }, [currentPage]);

    if (isLoading) return <Loading />;

    return (
        <div className="w-full mb-5">
            <table className="">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Numele categoriei</th>
                        <th className="px-6 py-4">Numărul produselor</th>
                        <th className="px-6 py-4">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id} className="border-b-2">
                            <td className="px-6 py-4">
                                {currentPage > 1 ? (currentPage - 1) * 10 + index + 1 : index + 1}
                            </td>
                            <td className="px-6 py-4">{category.translations.ro.name}</td>
                            <td className="px-6 py-4">{category.products?.length}</td>
                            <td className="px-6 py-4">
                                <span className="flex items-center gap-2">
                                    <Edit
                                        handleClick={() => {
                                            setFormType('edit');
                                            setModalCategory({ ...category });
                                            setModalActive(true);
                                        }}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormType('create');
                                    setModalCategory(copyObject(initialCategoryCreate));
                                    setModalActive(true);
                                }}
                            >
                                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                                    + Adaugă categorie
                                </h1>
                            </button>
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
                <CategoryFormWrapper
                    key={generateUUID()}
                    categories={categories}
                    setCategories={setCategories}
                    setModalActive={setModalActive}
                    category={{ ...modalCategory }}
                    formType={formType}
                    requestError={requestError}
                    setRequestError={setRequestError}
                />
            </Modal>
        </div>
    );
};

export default Categories;
