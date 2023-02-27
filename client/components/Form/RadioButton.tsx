import { ChangeEvent, useState } from 'react';

interface IRadioButtonProps {
    text: string;
    id: string;
    value: string;
    name: string;
    checked: boolean;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({ value, text, id, handleChange, checked, name }: IRadioButtonProps) => (
    <div className="bg-white dark:text-black w-full mb-2 py-1 pl-3 border-2 border-neutral-400 rounded-lg">
        <label className="block cursor-pointer select-none" htmlFor={id}>
            <input
                id={id}
                type="radio"
                className="mr-2 hidden"
                name={name}
                checked={checked}
                value={value}
                onChange={handleChange}
            />
            <span className="relative text-xs md:text-md pl-7 flex items-center">
                <span
                    className={`absolute rounded-full border-2 border-neutral-400 w-4 h-4 left-0 transition-all ${
                        checked && 'border-vp_brown-200'
                    }`}
                >
                    <span
                        className={`absolute rounded-full bg-vp_brown-200 w-2 h-2 left-2/4 top-2/4 transition-all opicity-0 scale-0 -translate-x-2/4 -translate-y-2/4 ${
                            checked && 'opacity-100 scale-110'
                        }`}
                    />
                </span>
                <span className="text-md">{text}</span>
            </span>
        </label>
    </div>
);

export default RadioButton;
