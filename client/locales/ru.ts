import { ITranslation } from '../types/translation';

const translation: ITranslation = {
    home: 'Домой',
    menu: 'Меню',
    wholeCategory: 'Весь список',
    cartEmpty: 'Корзина пуста!',
    noDescription: 'Описания нет',
    cart: 'Ваша корзина',
    subtotal: 'Цена',
    deliveryCost: 'Доставка',
    total: 'Итого',
    recommendedPositions: 'Рекоммендованные позиции:',
    checkout: 'Заказать',
    checkCart: 'Посмотреть корзину',
    contactInfo: 'Контактная информация',
    fullName: 'Имя, Фамилия*',
    email: 'example@email.com',
    deliveryType: 'Метод выдачи',
    delivery: 'Доставка',
    pickUp: 'Забрать с ресторана',
    deliveryTime: 'Время выдачи',
    soon: 'Как можно быстрее',
    atTime: 'Выберите время',
    paymentMethod: 'Способ оплаты',
    cash: 'Наличными',
    address: 'Адрес',
    city: 'Выберите населенный пункт*',
    street: 'Улица*',
    houseNumber: 'Номер дома*',
    apartment: 'Квартира*',
    entrance: 'Подъезд',
    floor: 'Этаж',
    intercomCode: 'Код домофона',
    additionalInformation: 'Дополнительная информация',
    leaveComment: 'Оставьте комментарий...',
    order: 'Заказать',

    today: 'Сегодня',
    tomorrow: 'Завтра',

    wine: 'Вино',

    admin: {
        categoryName: 'Название категории',
        sizeValue: 'Значение меры измерения',
        productName: 'Имя продукта',
        productDescription: 'Описание продукта',
    },

    validationErrors: {
        requiredName: 'Введите имя и фамилию',
        requiredPhone: 'Введите номер телефона',
        requiredCity: 'Выберите населенный пункт',
        requiredStreet: 'Введите название улицы',
        requiredHouseNumber: 'Введите номер дома',
        requiredApartment: 'Введите номер квартиры',
        invalidEmail: 'Введите валидный e-mail',
        invalidLengthPhone: 'Номер телефона должен состоять из 8 цифр',
    },
};

export default translation;
