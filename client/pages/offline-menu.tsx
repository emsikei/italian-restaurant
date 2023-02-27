import type { GetStaticPropsResult } from 'next';

import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import OfflineMenu from '../components/OfflineMenu/OfflineMenu';
import CircularLoading from '../components/shared/CircularLoading';
import { useUser } from '../contexts/user.context';
import { isObjectEmpty } from '../helpers';
import MainLayout from '../layouts/MainLayout';
import { fetcher } from '../lib/fetcher';
import { UserDocument } from '../types/auth';
import { ICategory } from '../types/category';

interface IOfflineMenuProps {
    menu: ICategory[];
}

// eslint-disable-next-line react/prop-types
const OfflineMenuPage = ({ menu }: IOfflineMenuProps) => {
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
            </Head>

            {!isObjectEmpty(user) ? (
                <MainLayout menu={menu}>
                    <section className="mt-24">
                        <OfflineMenu menu={menu} />
                    </section>
                </MainLayout>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IOfflineMenuProps>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/offline-menu`);
    const menu: ICategory[] = await res.json();

    return {
        props: {
            menu,
        },
        revalidate: 10,
    };
}

export default OfflineMenuPage;
