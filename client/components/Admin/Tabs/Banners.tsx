import { useEffect, useState } from 'react';
import { FormType } from '../../../constants';
import { generateUUID } from '../../../helpers';
import useFetch from '../../../hooks/useFetch';
import { deleter, fetcher } from '../../../lib/fetcher';
import { QueryAdminData } from '../../../types/admin';
import { IBanner } from '../../../types/banner';
import { RequestError } from '../../../types/errors';
import Pagination from '../../NewPagination/Pagination';
import Loading from '../../shared/Loading';
import { Delete, Edit } from '../Buttons';
import Confirm from '../Confirm';
import BannerFormWrapper from '../Forms/Banner/BannerFormWrapper';
import Modal from '../Modal';

const Banners = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmActive, setConfirmActive] = useState<boolean>(false);
    const [modalBanner, setModalBanner] = useState<IBanner>({
        imageLocalUrl: '',
    });
    const [formType, setFormType] = useState<FormType>('create');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [requestError, setRequestError] = useState<string | RequestError>('');

    const [banners, setBanners] = useState<IBanner[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const [error, fetchedData] = await fetcher<QueryAdminData<IBanner[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/banners?page=${currentPage}`
            );

            if (!error && fetchedData) {
                setBanners(fetchedData.data);
                setTotalPages(fetchedData.totalPages);
            }
            setIsLoading(false);
        };
        fetch();
    }, [currentPage]);

    const handleBannerDelete = async (publicId: string): Promise<void> => {
        const filtered = banners.filter((b) => b.publicId !== publicId);
        setBanners(filtered);

        const [error, data] = await deleter(`${process.env.NEXT_PUBLIC_API_URL}/banners/${publicId}`);

        if (error) setRequestError(error);

        if (!error) {
            setConfirmActive(false);
            setBanners(filtered);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <table className="min-w-[60%]">
                <thead className="text-left border-b-2">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Banner preview</th>
                        <th className="px-6 py-4">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map((banner, index) => (
                        <tr key={banner._id} className="border-b-2">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">
                                <img src={banner.bannerUrl} alt={banner.publicId} className="w-15 h-11" />
                            </td>
                            <td className="px-6 py-">
                                <span className="flex items-center gap-2">
                                    <Edit
                                        handleClick={() => {
                                            setFormType('edit');
                                            setModalBanner(banner);
                                            setModalActive(true);
                                        }}
                                    />
                                    <Delete
                                        handleClick={() => {
                                            setModalBanner(banner);
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
                    setModalBanner({
                        imageLocalUrl: '',
                    });
                    setModalActive(true);
                }}
            >
                <h1 className="px-6 py-4 font-medium cursor-pointer transition-all hover:text-vp_brown-100">
                    + Adaugă baner
                </h1>
            </button>

            <Modal active={confirmActive} setActive={setConfirmActive}>
                <Confirm
                    value={modalBanner.bannerUrl as string}
                    setActive={setConfirmActive}
                    requestError={requestError}
                    handlePositiveAnswer={() => handleBannerDelete(modalBanner.publicId as string)}
                />
            </Modal>

            <Modal active={modalActive} setActive={setModalActive}>
                <BannerFormWrapper
                    key={generateUUID()}
                    banners={banners}
                    setBanners={setBanners}
                    setModalActive={setModalActive}
                    banner={modalBanner}
                    formType={formType}
                    requestError={requestError}
                    setRequestError={setRequestError}
                />
            </Modal>
        </div>
    );
};

export default Banners;
