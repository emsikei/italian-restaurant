import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import Cart from '../components/Cart/Cart';
import CheckoutForm from '../components/Checkout/Form';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar';
import CheckoutLayout from '../layouts/CheckoutLayout';
import MobileCart from '../components/Checkout/MobileCart';
import { useUser } from '../contexts/user.context';
import { fetcher } from '../lib/fetcher';
import { UserDocument } from '../types/auth';
import { isObjectEmpty } from '../helpers';
import CircularLoading from '../components/shared/CircularLoading';

const CheckoutPage: NextPage = () => {
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
                <title>IR | Checkout</title>
                <meta name="description" content="Checkout - Vino Pizza & Wine" />
            </Head>

            {!isObjectEmpty(user) ? (
                <CheckoutLayout>
                    <section className="grid grid-cols-12 w-full h-screen px-">
                        <section className="lg:border-r-2 border-neutral-400 lg:pr-12 col-span-12 lg:col-span-6">
                            <CheckoutNavbar />
                            <MobileCart />
                            <CheckoutForm />
                        </section>
                        <section className="p-11 hidden lg:block lg:col-span-6">
                            <Cart type="checkout" />
                        </section>
                    </section>
                </CheckoutLayout>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

export default CheckoutPage;
