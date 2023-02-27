import type { NextPage } from 'next';
import Link from 'next/link';
import { CgMailForward } from 'react-icons/cg';
import useTranslations from '../hooks/useTranslations';

const NotFoundPage: NextPage = () => {
    const t = useTranslations();

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <span>404 |</span>
            <Link href="/">
                <a className="flex items-center pl-1 gap-1 transition-all hover:text-vp_brown-100">
                    <span>{t.home}</span>
                    <span>
                        <CgMailForward />
                    </span>
                </a>
            </Link>
        </div>
    );
};

export default NotFoundPage;
