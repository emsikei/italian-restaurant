import { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import CounterCart from '../shared/CounterCart';
import Flags from './Flags';
import NavLink from './NavLink';
import Sidebar from './Sidebar';
import useTranslations from '../../hooks/useTranslations';

import { useLocale } from '../../contexts/locale.context';
import { LocaleType } from '../../types/locale';
import { checkForRequiredCategory, generateUUID } from '../../helpers';
import { ICategory } from '../../types/category';

interface INavbarProps {
    categories?: ICategory[];
}

const Navbar = ({ categories }: INavbarProps) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [showCartPopUp, setShowCartPopUp] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const firstWine = categories?.find(
        (category) => category.slug?.includes('wine') || category.slug?.includes('champagne')
    );

    const t = useTranslations();
    const { locale } = useLocale();

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    });

    const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className={`px-2 md:px-10 fixed py-2 w-screen top-0 z-30 ${scrolled && 'bg-white dark:text-black'}`}>
            <nav className="order-3 container mx-auto flex justify-between items-center md:px-10 lg:px-6">
                <button type="button" className="block lg:hidden cursor-pointer" onClick={handleClick}>
                    {!showSidebar ? <GiHamburgerMenu size={25} /> : <GrClose size={25} />}
                </button>
                <Sidebar
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    handleClick={handleClick}
                    categories={categories}
                />
                <div className="text-center gap-3">
                    <Link href="/">
                        <span>
                            <Image
                                src="/assets/images/logo-svg.svg"
                                width={70}
                                height={50}
                                alt="Logo"
                                className="hover:cursor-pointer"
                            />
                        </span>
                    </Link>
                    <a className="hidden lg:block font-bold text-xs" href="tel:022602602">
                        022-602-602
                    </a>
                </div>
                <div className="hidden lg:flex lg:justify-between lg:items-center gap-5">
                    <ul className="md:flex font-semibold gap-2">
                        {categories && (
                            <Link href="/offline-menu">
                                <a className="py-1 md:p-2 flex items-center md:justify-center rounded-2xl text-center transition-all ease-in-out cursor-pointer hover:text-vp_brown-100">
                                    <span>{t.menu}</span>
                                </a>
                            </Link>
                        )}
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
                <div className="flex gap-5 items-center justify-between">
                    {/* <div className="hidden lg:flex items-center mr-2">
                        <Flags />
                    </div> */}

                    <div className="hidden lg:flex gap-2">
                        <span className="border rounded-full border-vp_brown-100 p-1 text-sm hover:bg-vp_brown-100 text-vp_brown-100 hover:text-white transition-all cursor-pointer">
                            <Link href="https://www.instagram.com//">
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

                    <CounterCart mainIcon showCartPopUp={showCartPopUp} setShowCartPopUp={setShowCartPopUp} />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
