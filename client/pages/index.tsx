import type { GetStaticPropsResult, NextPage } from 'next';

import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';
import { BannerContainer } from '../components/Banner';
import MainLayout from '../layouts/MainLayout';
import { ICategory } from '../types/category';
import { useUser } from '../contexts/user.context';
import { fetcher } from '../lib/fetcher';
import { UserDocument } from '../types/auth';
import { isObjectEmpty } from '../helpers';
import CircularLoading from '../components/shared/CircularLoading';

interface IHomeProps {
    menu: ICategory[];
}

// eslint-disable-next-line react/prop-types
const HomePage = ({ menu }: IHomeProps) => {
    // TODO: remove after db population
    const { user, setUser } = useUser();

    const getMe = async () => {
        const [error, fetchedUser] = await fetcher<UserDocument>(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);
        if (!error && fetchedUser && fetchedUser.roles.includes('ADMIN')) setUser(fetchedUser);
        else Router.push('/login');
    };

    useEffect(() => {
        if (isObjectEmpty(user)) getMe();
    }, [user]);

    // remove after db population

    return (
        <>
            <Head>
                <title>IR | Acasă</title>
                <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/en`} />
                <link rel="alternate" hrefLang="ru" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/ru`} />
                <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}`} />
                <meta name="description" content="Meniu online - Vino Pizza & Wine" />
            </Head>

            {!isObjectEmpty(user) ? (
                <MainLayout menu={menu}>
                    <BannerContainer />
                    <Menu menu={menu} />
                </MainLayout>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

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
