import { useEffect, useState } from 'react';
import { useLocale } from '../contexts/locale.context';
import { en, ro, ru } from '../locales';
import { ITranslation } from '../types/translation';

const table: Record<string, ITranslation> = {
    ro,
    ru,
    en,
};

export default function useTranslations(): ITranslation {
    const { locale } = useLocale();
    const [translation, setTranslation] = useState<ITranslation>(table[locale]);

    useEffect(() => {
        setTranslation(table[locale]);
    }, [locale]);

    return translation;
}
