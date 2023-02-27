import type { GetStaticPropsResult } from 'next';

import Head from 'next/head';
import OfflineMenu from '../components/OfflineMenu/OfflineMenu';
import MainLayout from '../layouts/MainLayout';
import { ICategory } from '../types/category';

interface IOfflineMenuProps {
    menu: ICategory[];
}

// eslint-disable-next-line react/prop-types
const OfflineMenuPage = ({ menu }: IOfflineMenuProps) => {
    return (
        <>
            <Head>
                <title>IR | Acasă</title>
                <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/en`} />
                <link rel="alternate" hrefLang="ru" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/ru`} />
                <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}`} />
            </Head>

            <MainLayout menu={menu}>
                <section className="mt-24">
                    <OfflineMenu menu={menu} />
                </section>
            </MainLayout>
        </>
    );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IOfflineMenuProps>> {
    const res = await fetch(`${process.env.SSR_API_URL}/menu/offline-menu`);
    const menu: ICategory[] = await res.json();

    return {
        props: {
            menu,
        },
        revalidate: 10,
    };
}

export default OfflineMenuPage;
