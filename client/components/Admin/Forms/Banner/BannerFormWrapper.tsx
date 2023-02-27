import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FormType } from '../../../../constants';
import { copyObject } from '../../../../helpers';
import { poster, putter } from '../../../../lib/fetcher';
import { initialBannerValidationErrors } from '../../../../states/admin';
import { IBanner } from '../../../../types/banner';
import { RequestError } from '../../../../types/errors';
import { BannerValidationErrors, BannerValidationReturn } from '../../../../types/validation';
import { Save } from '../../Buttons';
import BannerForm from './BannerForm';

interface IBannerFormWrapperProps {
    banners: IBanner[];
    setBanners: Dispatch<SetStateAction<IBanner[]>>;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    banner: IBanner;
    formType: FormType;
    requestError: string | RequestError;
    setRequestError: Dispatch<SetStateAction<string | RequestError>>;
}

const BannerFormWrapper = ({
    banners,
    setBanners,
    setModalActive,
    banner,
    formType,
    requestError,
    setRequestError,
}: IBannerFormWrapperProps) => {
    const [formValues, setFormValues] = useState<IBanner>(banner);
    const [validationErrors, setValidationErrors] = useState<BannerValidationErrors>(initialBannerValidationErrors);
    const [validationErrorExist, setValidationErrorExist] = useState<boolean>(false);

    const validate = (values: IBanner): BannerValidationReturn => {
        const hasErrors = false;

        const errors: BannerValidationErrors = copyObject(initialBannerValidationErrors);

        setValidationErrors(errors);

        return { hasErrors, errors };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => {
        const values = { ...formValues };
        const { name, value } = e.target;

        object[name] = value;

        if (type === 'image') {
            const { files } = e.target;

            if (files!.length < 1) return;

            const url: string = URL.createObjectURL(files![0]);

            // eslint-disable-next-line prefer-destructuring
            values.imageLocal = files![0];
            values.imageLocalUrl = url;
        }

        setValidationErrors(initialBannerValidationErrors);
        setFormValues(values);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { hasErrors, errors } = validate(formValues);

        if (!hasErrors) {
            if (formType === 'create') {
                const formData = new FormData();
                formData.append('banner', formValues.imageLocal as Blob);

                const [error, data] = await poster<IBanner>(`${process.env.NEXT_PUBLIC_API_URL}/banners`, formData);

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    setBanners([data as IBanner, ...banners]);
                    setModalActive(false);
                }
            } else {
                const formData = new FormData();
                formData.append('banner', formValues.imageLocal as Blob);

                const [error, data] = await putter<IBanner>(
                    `${process.env.NEXT_PUBLIC_API_URL}/banners/${formValues.publicId}`,
                    formData
                );

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    const arr = [...banners];
                    const index = arr.findIndex((b) => b._id === data?._id);
                    arr[index] = data as IBanner;

                    setBanners(arr);
                    setModalActive(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mt-5 mb-4">
                <BannerForm formValues={formValues} handleChange={handleChange} errors={validationErrors} />
            </div>
            <Save />
            <p className="ml-1 mt-2 text-xs text-red-500">{requestError && JSON.stringify(requestError)}</p>
        </form>
    );
};

export default BannerFormWrapper;
