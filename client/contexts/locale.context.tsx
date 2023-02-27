/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useRouter } from 'next/router';
import { ReactNode, useState, createContext, useContext, useEffect, MouseEvent } from 'react';
import { getItemFromLocalStorage, setItemLocalStorage } from '../helpers';

interface LocaleContext {
    locale: string;
    changeLocale: (lang: string) => void;
}

export const LocalePContextImpl = createContext<LocaleContext>(null!);

export function useLocale() {
    return useContext(LocalePContextImpl);
}

interface Props {
    children: ReactNode;
}

export const LocaleProvider = ({ children }: Props) => {
    const [_locale, setLocale] = useState<string>('ro');
    const router = useRouter();

    useEffect(() => {
        const localStorageLocale = getItemFromLocalStorage<string>('lang');

        if (!localStorageLocale) {
            router.push(router.pathname, router.asPath, { locale: _locale, scroll: false });
        } else {
            setLocale(localStorageLocale);
            router.push(router.pathname, router.asPath, { locale: localStorageLocale, scroll: false });
        }
    }, []);

    const changeLocale = (lang: string) => {
        setLocale(lang);
        setItemLocalStorage('lang', lang);
        router.push(router.pathname, router.asPath, { locale: lang, scroll: false });
    };

    return (
        <LocalePContextImpl.Provider value={{ locale: _locale, changeLocale }}>{children}</LocalePContextImpl.Provider>
    );
};
