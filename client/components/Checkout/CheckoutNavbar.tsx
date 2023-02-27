import Image from 'next/image';
import Link from 'next/link';
import useTranslations from '../../hooks/useTranslations';
import { MenuArrowLeftIcon } from '../../svg/icons';

const CheckoutNavbar = () => {
    const t = useTranslations();

    return (
        <nav className="w-full flex justify-between items-center py-5 border-b-2 border-neutral-400">
            <Link href="/">
                <a>
                    <span className="flex items-center">
                        <MenuArrowLeftIcon />
                        <span className="ml-2 text-sm">{t.home}</span>
                    </span>
                </a>
            </Link>
            <div className="w-24 max-h-11 relative mb-5 cursor-pointer">
                <Link href="/">
                    <span>
                        <Image
                            src="/assets/images/logo.png"
                            alt="Logo"
                            layout="responsive"
                            objectFit="contain"
                            width={1280}
                            height={853}
                        />
                    </span>
                </Link>
            </div>
            <span className="text-xs sm:text-sm">022-602-602</span>
        </nav>
    );
};

export default CheckoutNavbar;
