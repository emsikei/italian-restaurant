import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import categories from '../../data/categories.json';
import MainLayout from '../../layouts/MainLayout';
import { LocaleType } from '../../types/locale';

const DeliveryMenuPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>IR | Meniu pentru livrare </title>
            </Head>

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
        </>
    );
};

export default DeliveryMenuPage;
