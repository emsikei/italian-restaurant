import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { motion } from 'framer-motion';

import { CartProvider } from '../contexts/cart.context';
import '../styles/globals.css';
import { LocaleProvider } from '../contexts/locale.context';
import { UserProvider } from '../contexts/user.context';

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <UserProvider>
            <LocaleProvider>
                <CartProvider>
                    <motion.div
                        key={router.route}
                        initial="pageInitial"
                        animate="pageAnimate"
                        variants={{
                            pageInitial: {
                                opacity: 0,
                            },
                            pageAnimate: {
                                opacity: 1,
                            },
                        }}
                    >
                        <NextNProgress color="#FDBA74" />
                        <Component {...pageProps} />
                    </motion.div>
                </CartProvider>
            </LocaleProvider>
        </UserProvider>
    );
}

export default MyApp;
