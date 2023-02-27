import Link from 'next/link';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import useKeyPress from '../../hooks/useKey';
import useTranslations from '../../hooks/useTranslations';
import { IProduct } from '../../types/product';
import ProductModal from '../ProductModal/ProductModal';
import Product from './Product';

export interface ISingleCategoryProps {
    id: string;
    name: string;
    products: IProduct[];
}

const SingleCategory = ({ id, name, products }: ISingleCategoryProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [activeProduct, setActiveProduct] = useState<IProduct | undefined>(undefined);

    const t = useTranslations();
    const escapePressed = useKeyPress('Escape', () => {
        setShowModal(false);
    });

    return (
        <>
            <section id={name} key={id} className="container mx-auto mt-32 px-2 sm:px-0">
                <div className="w-full flex justify-between items-start">
                    <h1 className="font-bold text-4xl mb-2">{name}</h1>
                    <Link href="/">
                        <a className="font-medium text-md flex justify-between items-center">
                            <FiChevronLeft />
                            <span className="ml-1.5">{t.home}</span>
                        </a>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2.5">
                    {products?.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            setActiveProduct={setActiveProduct}
                        />
                    ))}
                </div>
            </section>
            <ProductModal showModal={showModal} setShowModal={setShowModal} product={activeProduct as IProduct} />
        </>
    );
};
export default SingleCategory;
