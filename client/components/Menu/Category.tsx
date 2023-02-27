import Link from 'next/link';
import { useState } from 'react';
import { BiListPlus } from 'react-icons/bi';
import { LocaleType } from '../../types/locale';
import { useLocale } from '../../contexts/locale.context';
import { ICategory } from '../../types/category';
import { IProduct } from '../../types/product';
import ProductModal from '../ProductModal/ProductModal';
import ProductSlider from '../Sliders/ProductSlider';
import useTranslations from '../../hooks/useTranslations';
import useKeyPress from '../../hooks/useKey';

interface ICategoryProps {
    category: ICategory;
}

const Category = ({ category: { _id, translations, slug, products } }: ICategoryProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [activeProduct, setActiveProduct] = useState<IProduct | undefined>(undefined);

    const { locale } = useLocale();
    const t = useTranslations();
    const escapePressed = useKeyPress('Escape', () => {
        setShowModal(false);
    });

    return (
        <>
            <section key={_id} className="mb-16">
                <div className="w-full flex justify-between lg:items-start items-center" id={slug}>
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2">
                        {translations[locale as LocaleType].name}
                    </h1>
                    <Link href={`/online-menu/${slug}`}>
                        <a className="font-medium text-md flex justify-between items-center">
                            {/* <MenuArrow /> */}
                            <BiListPlus />
                            {/* <span className="ml-2.5">spre meniu {translations[locale as LocaleType].name}</span> */}
                            <span className="text-xs sm:text-sm md:text-md lg:text-lg ml-2.5">{t.wholeCategory}</span>
                        </a>
                    </Link>
                </div>
                <ProductSlider
                    id={_id as string}
                    products={products as IProduct[]}
                    activeProduct={activeProduct}
                    setActiveProduct={setActiveProduct}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </section>
            <ProductModal showModal={showModal} setShowModal={setShowModal} product={activeProduct} />
        </>
    );
};
export default Category;
