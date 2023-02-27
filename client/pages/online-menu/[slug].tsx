import Head from 'next/head';

import Router from 'next/router';
import { useEffect } from 'react';
import SingleCategory from '../../components/Menu/SingleCategory';
import MainLayout from '../../layouts/MainLayout';

import { ICategory } from '../../types/category';
import { LocaleType } from '../../types/locale';
import { useLocale } from '../../contexts/locale.context';
import { IProduct } from '../../types/product';
import { isObjectEmpty } from '../../helpers';
import { useUser } from '../../contexts/user.context';
import { fetcher } from '../../lib/fetcher';
import { UserDocument } from '../../types/auth';
import CircularLoading from '../../components/shared/CircularLoading';

interface ICategoryProps {
    category: ICategory;
}

const CategoryPage = ({ category }: ICategoryProps) => {
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
                <title>IR | {category.translations[locale as LocaleType].name}</title>
            </Head>

            {!isObjectEmpty(user) ? (
                <MainLayout>
                    <SingleCategory
                        id={category._id as string}
                        name={category.translations[locale as LocaleType].name}
                        products={category.products as IProduct[]}
                    />
                </MainLayout>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/slugs`);
    const slugs: [{ slug: string }] = await res.json();

    const categorySlugs: any = [];

    slugs.forEach((slug) => {
        categorySlugs.push({
            params: { slug: slug.slug },
        });
    });

    return {
        paths: categorySlugs,
        fallback: false,
    };
}

export const getStaticProps = async (context: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/online-menu/${context.params.slug}`);
    const category = await res.json();

    if (res.status === 404) {
        return {
            redirect: {
                permanent: false,
                destination: '/404',
            },
        };
    }

    return {
        props: {
            category,
        },
        revalidate: 10,
    };
};

export default CategoryPage;
