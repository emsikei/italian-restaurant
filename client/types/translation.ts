export interface ITranslation {
    home: string;
    menu: string;
    wholeCategory: string;
    noDescription: string;
    cartEmpty: string;
    cart: string;
    subtotal: string;
    deliveryCost: string;
    total: string;
    recommendedPositions: string;
    checkout: string;
    checkCart: string;
    contactInfo: string;
    fullName: string;
    email: string;
    deliveryType: string;
    delivery: string;
    pickUp: string;
    deliveryTime: string;
    soon: string;
    atTime: string;
    paymentMethod: string;
    cash: string;
    address: string;
    city: string;
    street: string;
    houseNumber: string;
    apartment: string;
    entrance: string;
    floor: string;
    intercomCode: string;
    additionalInformation: string;
    leaveComment: string;
    order: string;

    today: string;
    tomorrow: string;

    wine: string;

    admin: {
        categoryName: string;
        sizeValue: string;
        productName: string;
        productDescription: string;
    };

    validationErrors: {
        requiredName: string;
        requiredPhone: string;
        requiredCity: string;
        requiredStreet: string;
        requiredHouseNumber: string;
        requiredApartment: string;
        invalidEmail: string;
        invalidLengthPhone: string;
    };
}
