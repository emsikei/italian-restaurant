import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import Router from 'next/router';
import { initialLoginState } from '../../states/auth';
import { AuthLogin, UserDocument } from '../../types/auth';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Label from '../Form/Label';
import { LoginValidationErrors, LoginValidationReturn } from '../../types/validation';
import { copyObject } from '../../helpers';
import { initialLoginValidationErrors } from '../../states/order';
import { poster } from '../../lib/fetcher';

const Form = () => {
    const [formValues, setFormValues] = useState<AuthLogin>(initialLoginState);
    const [validationErrors, setValidationErrors] = useState<LoginValidationErrors>(
        copyObject(initialLoginValidationErrors)
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, object: any, type?: string) => {
        const values = { ...formValues };
        const { name, value } = e.target;

        values[name as keyof AuthLogin] = value;

        setValidationErrors(copyObject(initialLoginValidationErrors));
        setFormValues(values);
    };

    const validate = (values: AuthLogin): LoginValidationReturn => {
        let hasErrors = false;

        const errors: LoginValidationErrors = copyObject(initialLoginValidationErrors);

        if (!values.email) {
            errors.email = 'Email is required!';
            hasErrors = true;
        }

        if (!values.password) {
            errors.password = 'Password is required!';
            hasErrors = true;
        }

        setValidationErrors(errors);

        return { hasErrors, errors };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { hasErrors, errors } = validate(formValues);

        if (!hasErrors) {
            const [error, data] = await poster(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formValues);

            if (!error && data) Router.push('/admin');

            setFormValues(initialLoginState);
        } else {
            console.log('Errors: ', errors);
        }
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
                <Label text="Login" />
                <span className="flex items-center mb-3 text-neutral-600 font-medium text-sm">
                    <FiChevronLeft />
                    <Link href="/">
                        <a>Acasa</a>
                    </Link>
                </span>
            </div>
            <div>
                <Input
                    placeholder="Email"
                    name="email"
                    handleChange={(e) => handleChange(e, formValues)}
                    value={formValues.email}
                    error={validationErrors.email}
                />
            </div>
            <div>
                <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    error={validationErrors.password}
                    handleChange={(e) => handleChange(e, formValues)}
                />
            </div>
            <div className="w-full">
                <Button type="submit" text="Submit" />
            </div>
        </form>
    );
};

export default Form;
