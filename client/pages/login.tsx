import type { NextPage } from 'next';

import Head from 'next/head';
import Form from '../components/Login/Form';
import CircularLoading from '../components/shared/CircularLoading';
import { useUser } from '../contexts/user.context';
import { isObjectEmpty } from '../helpers';

const Login: NextPage = () => {
    const { user } = useUser();

    return (
        <>
            <Head>
                <title>IR | Login</title>
            </Head>
            {/* <Image src="/assets/images/logo.png" alt="Logo" width={100} height={100} /> */}
            <section className="h-screen w-screen flex justify-center items-center gap-3 flex-col">
                {isObjectEmpty(user) ? (
                    <>
                        <h1 className="text-lg font-medium uppercase">
                            Site-ul este pe etapă de dezvoltare! Acces numai pentru persoane autorizate
                        </h1>
                        <Form />
                    </>
                ) : (
                    <CircularLoading />
                )}
            </section>
        </>
    );
};

export default Login;
