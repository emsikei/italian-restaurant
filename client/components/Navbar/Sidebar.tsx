/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import Flags from './Flags';
import useTranslations from '../../hooks/useTranslations';
import useOutsideClick from '../../hooks/useOutsideClick';

import { checkForRequiredCategory, generateUUID } from '../../helpers';
import NavLink from './NavLink';
import { LocaleType } from '../../types/locale';
import { useLocale } from '../../contexts/locale.context';
import { ICategory } from '../../types/category';

interface ISidebar {
    categories?: ICategory[];
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
    handleClick: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const Sidebar = ({ categories, showSidebar, setShowSidebar, handleClick }: ISidebar) => {
    const t = useTranslations();
    const ref = useOutsideClick(() => setShowSidebar(false));
    const firstWine = categories?.find((category) => category.slug?.includes('wine'));
    const { locale } = useLocale();

    return (
        <div
            ref={ref}
            className={`fixed bg-white dark:bg-black lg:hidden h-full w-[80vw] z-40 top-0 left-0 ease-in-out duration-300 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="pl-6 pb-11">
                <div className="relative w-full m-0 p-0 outline-none border-none" onClick={handleClick}>
                    <AiOutlineClose size={20} className="absolute right-3 top-3 cursor-pointer" />
                </div>
                <div className="pt-11">
                    <Image src="/assets/images/logo.png" width={80} height={80} />
                </div>
                <div className="my-3">
                    <ul className="text-lg font-medium">
                        {/* <NavLink text={t.menu} /> */}
                        <Link href="/offline-menu">
                            <a
                                className="py-1 md:p-2 flex items-center md:justify-center rounded-2xl text-center transition-all ease-in-out cursor-pointer hover:text-vp_brown-100"
                                onClick={() => setShowSidebar(false)}
                            >
                                <span>{t.menu}</span>
                            </a>
                        </Link>
                        {categories?.map((category) => {
                            if (
                                checkForRequiredCategory(category.slug as string) ||
                                category.slug === firstWine?.slug
                            ) {
                                if (category.slug === firstWine?.slug) {
                                    return <NavLink key={generateUUID()} text={t.wine} id={category.slug} />;
                                }
                                return (
                                    <NavLink
                                        key={generateUUID()}
                                        text={category.translations[locale as LocaleType].name}
                                        id={category.slug}
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
                {/* <div className="flex items-center mr-2">
                    <Flags setShowSidebar={setShowSidebar} />
                </div> */}
                <div className="flex gap-2">
                    <span className="border rounded-full border-vp_brown-100 p-1 text-sm hover:bg-vp_brown-100 text-vp_brown-100 hover:text-white transition-all cursor-pointer">
                        <Link href="https://www.instagram.com/">
                            <a target="_blank">
                                <FaInstagram />
                            </a>
                        </Link>
                    </span>

                    <span className="border rounded-full border-vp_brown-100 p-1 text-sm hover:bg-vp_brown-100 text-vp_brown-100 hover:text-white transition-all cursor-pointer">
                        <Link href="https://www.facebook.com/">
                            <a target="_blank">
                                <FaFacebookF />
                            </a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
