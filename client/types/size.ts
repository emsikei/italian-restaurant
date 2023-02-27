export type SizeTranslation = {
    value: string;
};

export type SizeTranslations = {
    ro: SizeTranslation;
    ru: SizeTranslation;
    en: SizeTranslation;
};

export type ISize = {
    _id?: string;
    translations: SizeTranslations;
};

export type SizeCreate = Pick<ISize, 'translations'>;
