import { ChangeEvent } from 'react';

interface IInputProps {
    error?: string;
    value: string | number;
    type?: string;
    name: string;
    placeholder: string;
    maxlength?: number;
    classes?: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ error, value, name, placeholder, maxlength, classes, handleChange, type = 'text' }: IInputProps) => (
    <>
        {name === 'phoneNumber' && (
            <label className="absolute ml-2 py-2 md:py-1.5 z-50 text-xs md:text-sm" htmlFor="phoneNumber">
                +373
            </label>
        )}
        <input
            id={name}
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full rounded-lg pl-3 py-1 border-2 border-neutral-400 text-sm md:text-md focus:outline-none focus:border-vp_brown-200 placeholder:text-xs md:placeholder:text-sm ${
                name === 'phoneNumber' && 'indent-7 md:indent-8'
            } ${classes}`}
            maxLength={(maxlength as number) || 999}
        />
        <p className="ml-1 mt-2 text-xs text-red-500">{error}</p>
    </>
);

export default Input;
