import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import categories from '../../data/categories.json';
import MainLayout from '../../layouts/MainLayout';
import { useLocale } from '../../contexts/locale.context';
import { LocaleType } from '../../types/locale';
import { useUser } from '../../contexts/user.context';
import { isObjectEmpty } from '../../helpers';
import { fetcher } from '../../lib/fetcher';
import { UserDocument } from '../../types/auth';
import CircularLoading from '../../components/shared/CircularLoading';

const DeliveryMenuPage: NextPage = () => {
    const { locale } = useLocale();

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
                <title>IR | Meniu pentru livrare </title>
            </Head>

            {!isObjectEmpty(user) ? (
                <MainLayout>
                    <Navbar />
                    <section className="w-full text-center container px-10 flex grow-1 shrink flex-col items-center justify-center pb-9">
                        {categories.map((item) => (
                            <Link key={item.id} href={`/menu/${item.slug}`}>
                                <a>
                                    <h1 className="font-medium text-4xl leading-normal hover:text-vp_brown-100 transition-all">
                                        {item.translations[locale as LocaleType].name}
                                    </h1>
                                </a>
                            </Link>
                        ))}
                    </section>
                </MainLayout>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

export default DeliveryMenuPage;
