import { useEffect, useState } from 'react';
import { FormType } from '../../../constants';
import { copyObject, generateUUID } from '../../../helpers';
import useFetch from '../../../hooks/useFetch';
import { deleter, fetcher } from '../../../lib/fetcher';
import { initialProductState } from '../../../states/admin';
import { QueryAdminData } from '../../../types/admin';
import { ICategory } from '../../../types/category';
import { RequestError } from '../../../types/errors';
import { IProduct, ProductCreate } from '../../../types/product';
import { ISize } from '../../../types/size';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Delete, Edit } from '../Buttons';
import Confirm from '../Confirm';
import ProductFormWrapper from '../Forms/Product/ProductFormWrapper';
import Modal from '../Modal';

const Products = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmActive, setConfirmActive] = useState<boolean>(false);
    const [modalProduct, setModalProduct] = useState<IProduct>(copyObject(initialProductState));
    const [formType, setFormType] = useState<FormType>('create');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [requestError, setRequestError] = useState<string | RequestError>('');

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const [error, fetchedData] = await fetcher<QueryAdminData<IProduct[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/products?page=${currentPage}`
            );

            if (!error && fetchedData) {
                setProducts(fetchedData.data);
                setTotalPages(fetchedData.totalPages);
            }
            setIsLoading(false);
        };
        fetch();
    }, [currentPage]);

    const { data: sizes } = useFetch<ISize[]>(
        [
            {
                translations: {
                    ro: {
                        value: '',
                    },
                    en: {
                        value: '',
                    },
                    ru: {
                        value: '',
                    },
                },
                _id: '',
            },
        ] as ISize[],
        `${process.env.NEXT_PUBLIC_API_URL}/sizes/all`
    );

    const { data: categories } = useFetch<ICategory[]>(
        [
            {
                _id: '',
                translations: {
                    ro: {
                        name: '',
                    },
                    en: {
                        name: '',
                    },
                    ru: {
                        name: '',
                    },
                },
            },
        ] as ICategory[],
        `${process.env.NEXT_PUBLIC_API_URL}/categories/names`
    );

    const { data: recommendedProducts } = useFetch<IProduct[]>(
        [
            {
                _id: '',
                translations: {
                    ro: {
                        name: '',
                    },
                    en: {
                        name: '',
                    },
                    ru: {
                        name: '',
                    },
                },
            },
        ] as IProduct[],
        `${process.env.NEXT_PUBLIC_API_URL}/products/names`
    );

    const handleProductDelete = async (id: string): Promise<void> => {
        const filtered = products.filter((p) => p._id !== id);

        const [error, data] = await deleter(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

        if (error) setRequestError(error);

        if (!error) {
            setConfirmActive(false);
            setProducts(filtered);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-full mb-5">
            <table className="">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Numele produsului</th>
                        <th className="px-6 py-4">Categorie</th>
                        <th className="px-6 py-4">Online status</th>
                        <th className="px-6 py-4">Offline status</th>
                        <th className="px-6 py-4">Prețul, MDL</th>
                        <th className="px-6 py-4">Reducere, %</th>
                        <th className="px-6 py-4">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className="border-b-2">
                            <td className="px-6 py-4">
                                {currentPage > 1 ? (currentPage - 1) * 10 + index + 1 : index + 1}
                            </td>
                            <td className="px-6 py-4">{product.translations.ro.name}</td>
                            <td className="px-6 py-4">{product.category?.translations.ro.name}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`text-center block font-medium text-white px-2 py-2 rounded-md ${
                                        product.status.onlineMenu ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                >
                                    {product.status.onlineMenu ? 'activ' : 'inactiv'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`text-center block font-medium text-white px-2 py-2 rounded-md ${
                                        product.status.offlineMenu ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                >
                                    {product.status.offlineMenu ? 'activ' : 'inactiv'}
                                </span>
                            </td>
                            <td className="px-6 py-4">{product.defaultPriceAndSize?.price}</td>
                            <td className="px-6 py-4">{product.discount}</td>
                            <td className="px-6 py-4">
                                <span className="flex items-center gap-2">
                                    <Edit
                                        handleClick={() => {
                                            setFormType('edit');
                                            setModalProduct({ ...product });
                                            setModalActive(true);
                                        }}
                                    />
                                    <Delete
                                        handleClick={() => {
                                            setModalProduct(product);
                                            setConfirmActive(true);
                                        }}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormType('create');
                                    setModalProduct(copyObject(initialProductState));
                                    setModalActive(true);
                                }}
                            >
                                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                                    + Adaugă product
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

            <Modal active={confirmActive} setActive={setConfirmActive}>
                <Confirm
                    value={modalProduct.translations.ro.name}
                    setActive={setConfirmActive}
                    handlePositiveAnswer={() => handleProductDelete(modalProduct._id as string)}
                    requestError={requestError}
                />
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                <ProductFormWrapper
                    key={generateUUID()}
                    products={products}
                    setProducts={setProducts}
                    setModalActive={setModalActive}
                    product={{ ...modalProduct }}
                    sizes={sizes}
                    categories={categories}
                    recommendedProducts={recommendedProducts}
                    formType={formType}
                    requestError={requestError}
                    setRequestError={setRequestError}
                />
            </Modal>
        </div>
    );
};

export default Products;
