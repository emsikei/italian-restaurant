/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { useLocale } from '../../contexts/locale.context';
import { generateUUID } from '../../helpers';
import useTranslations from '../../hooks/useTranslations';
import { ICategory } from '../../types/category';
import { LocaleType } from '../../types/locale';

interface IOfflineMenuProps {
    menu: ICategory[];
}

const OfflineMenu = ({ menu }: IOfflineMenuProps) => {
    const [selected, setSelected] = useState<number | null>(null);

    const toggle = (i: number) => {
        if (selected === i) return setSelected(null);

        setSelected(i);
    };

    const { locale } = useLocale();
    const t = useTranslations();

    return (
        <section className="w-[100%] sm:w-[80%] lg:w-[50%] m-auto">
            <h1 className="text-center mb-2 font-bold uppercase">{t.menu}</h1>
            {menu.map((category, i) => (
                <div key={generateUUID()}>
                    <div
                        className="flex justify-between items-center py-1 px-2 border-b-2 mb-2 bg-vp_brown-100 rounded-md transition-all hover:text-white cursor-pointer"
                        onClick={() => toggle(i)}
                    >
                        <h2 className="font-semibold uppercase">{category.translations[locale as LocaleType].name}</h2>
                        <span className="text-xs">{selected === i ? <AiOutlineMinus /> : <BsPlusLg />}</span>
                    </div>
                    <div
                        className={`mb-2 transition-all max-h-0 overflow-hidden ${
                            selected === i && 'max-h-full h-auto'
                        }`}
                    >
                        {category.products?.map((product) => (
                            <div className="flex items-center justify-between" key={generateUUID()}>
                                <div className="flex items-center xs:gap-2">
                                    <h4 className="italic font-medium text-sm mr-1 xs:mr-0">
                                        {product.translations[locale as LocaleType].name}
                                    </h4>
                                    {product.pricesAndSizes.map((priceAndSize, index) => (
                                        <div className="text-xs xs:text-sm flex items-center" key={generateUUID()}>
                                            <p className="xs:mr-2">
                                                {
                                                    priceAndSize.size.translations[locale as LocaleType].value.split(
                                                        ' '
                                                    )[0]
                                                }
                                            </p>
                                            {index !== product.pricesAndSizes.length - 1 && <span>/</span>}
                                            {index === product.pricesAndSizes.length - 1 && (
                                                <span className="ml-1 xs:ml-0">
                                                    {
                                                        priceAndSize.size.translations[
                                                            locale as LocaleType
                                                        ].value.split(' ')[1]
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    {product.pricesAndSizes.map((priceAndSize, index) => (
                                        <div>
                                            <div className="text-xs xs:text-sm flex items-center" key={generateUUID()}>
                                                <p className="xs:mr-2">{priceAndSize.price}</p>
                                                {index !== product.pricesAndSizes.length - 1 && (
                                                    <span className="xs:mr-2">/</span>
                                                )}
                                                {index === product.pricesAndSizes.length - 1 && (
                                                    <span className="ml-1 xs:ml-0">MDL</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default OfflineMenu;
