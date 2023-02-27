import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Main from '../components/Admin/Main';
import Sidebar from '../components/Admin/Sidebar';
import CircularLoading from '../components/shared/CircularLoading';

import { useUser } from '../contexts/user.context';
import { isObjectEmpty } from '../helpers';
import { fetcher } from '../lib/fetcher';
import { UserDocument } from '../types/auth';

import { sidebarOptions } from '../states/admin';
import { SidebarOption } from '../types/admin';

const AdminPage: NextPage = () => {
    const { user, setUser } = useUser();
    const [activeTab, setActiveTab] = useState<SidebarOption>(sidebarOptions[0]);

    const getMe = async () => {
        const [error, fetchedUser] = await fetcher<UserDocument>(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);
        if (!error && fetchedUser && fetchedUser.roles.includes('ADMIN')) setUser(fetchedUser);
        else Router.push('/login');
    };

    useEffect(() => {
        if (isObjectEmpty(user)) getMe();
    }, [user]);

    useEffect(() => {
        // @ts-ignore
        document.body.style = 'background: white;';
    }, []);

    return (
        <>
            <Head>
                <title>IR | Admin</title>
            </Head>
            {!isObjectEmpty(user) ? (
                <section className="flex w-screen h-screen bg-white">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <Main activeTab={activeTab} />
                </section>
            ) : (
                <CircularLoading />
            )}
        </>
    );
};

export default AdminPage;
