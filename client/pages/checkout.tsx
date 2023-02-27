import type { NextPage } from 'next';
import Head from 'next/head';
import Cart from '../components/Cart/Cart';
import CheckoutForm from '../components/Checkout/Form';
import CheckoutNavbar from '../components/Checkout/CheckoutNavbar';
import CheckoutLayout from '../layouts/CheckoutLayout';
import MobileCart from '../components/Checkout/MobileCart';

const CheckoutPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>IR | Checkout</title>
                <meta name="description" content="Checkout - Vino Pizza & Wine" />
            </Head>

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
        </>
    );
};

export default CheckoutPage;
