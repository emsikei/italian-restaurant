import Head from 'next/head';

import SingleCategory from '../../components/Menu/SingleCategory';
import MainLayout from '../../layouts/MainLayout';

import { ICategory } from '../../types/category';
import { LocaleType } from '../../types/locale';
import { IProduct } from '../../types/product';

interface ICategoryProps {
    category: ICategory;
}

const CategoryPage = ({ category }: ICategoryProps) => {
    return (
        <>
            <Head>
                <title>IR | {category.translations[locale as LocaleType].name}</title>
            </Head>

            <MainLayout>
                <SingleCategory
                    id={category._id as string}
                    name={category.translations[locale as LocaleType].name}
                    products={category.products as IProduct[]}
                />
            </MainLayout>
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
