const category = {
    translations: {
        ro: {
            name: '',
        },
        en: {
            name: '',
        },
        ru: {
            name: '',
        },
    },
};

const isCategoryEmpty = (category) =>
    category.translations.ro.name === '' &&
    category.translations.ru.name === '' &&
    category.translations.en.name === '';

console.log(isCategoryEmpty(category));
