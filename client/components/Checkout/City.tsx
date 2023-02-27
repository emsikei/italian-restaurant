import { ChangeEvent } from 'react';
import { useCart } from '../../contexts/cart.context';
import { getDeliveryCostByLocality } from '../../helpers';
import useFetch from '../../hooks/useFetch';
import useTranslations from '../../hooks/useTranslations';
import { ILocality } from '../../types/locality';
import { IOrder } from '../../types/order';
import { CheckoutValidationErrors } from '../../types/validation';

interface ICityProps {
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, object: any, type?: string) => void;
    errors: CheckoutValidationErrors;
    formValues: IOrder;
}

const City = ({ handleChange, formValues, errors }: ICityProps) => {
    const { deliveryLocality, setDeliveryLocality } = useCart();

    const t = useTranslations();

    const { loading, data: localities } = useFetch<ILocality[]>(
        [],
        `${process.env.NEXT_PUBLIC_API_URL}/localities/all`
    );

    return (
        <>
            <select
                name="city"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                onChange={(e) => {
                    setDeliveryLocality({
                        name: e.target.value,
                        deliveryCost: getDeliveryCostByLocality(e.target.value, localities) as number,
                    });
                    handleChange(e, formValues.address, 'address');
                }}
                defaultValue="DEFAULT"
            >
                <option value="DEFAULT" disabled>
                    {t.city}
                </option>
                {localities.map((locality) => (
                    <option value={locality.name} key={locality._id}>
                        {locality.name}
                    </option>
                ))}
            </select>
            <p className="ml-1 mt-2 text-xs text-red-500">{errors.address?.city}</p>
        </>
    );
};

export default City;
