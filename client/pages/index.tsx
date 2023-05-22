import type { GetStaticPropsResult, NextPage } from 'next';

import Head from 'next/head';
import Menu from '../components/Menu/Menu';
import { BannerContainer } from '../components/Banner';
import MainLayout from '../layouts/MainLayout';
import { ICategory } from '../types/category';

interface IHomeProps {
    menu: ICategory[];
}

// eslint-disable-next-line react/prop-types
const HomePage = ({ menu }: IHomeProps) => (
    <>
        <Head>
            <title>IR | Acasă</title>
            <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/en`} />
            <link rel="alternate" hrefLang="ru" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/ru`} />
            <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}`} />
            <meta name="description" content="Meniu online - Vino Pizza & Wine" />
        </Head>

        <MainLayout menu={menu}>
            <BannerContainer />
            <Menu menu={menu} />
        </MainLayout>
    </>
);

export async function getStaticProps(): Promise<GetStaticPropsResult<IHomeProps>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/online-menu`);
    const menu: ICategory[] = await res.json();

    return {
        props: {
            menu,
        },
        revalidate: 10,
    };
}

export default HomePage;
