import { ChangeEvent } from 'react';
import { generateUUID } from '../../helpers';

interface ISelectProps {
    name: string;
    options: any;
    defaultValue?: any;
    firstOptionDisabled?: boolean;
    valueFormatFunction: (value: any) => string;
    displayFormatFunction: (value: any) => string;
    firstOptionDisplayFormatFunction?: (value: any) => string;
    onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    classes?: string;
    selected?: any;
}

const Select = ({
    name,
    options,
    defaultValue,
    firstOptionDisabled,
    valueFormatFunction,
    displayFormatFunction,
    firstOptionDisplayFormatFunction,
    onChange,
    classes,
    selected,
}: ISelectProps) => (
    <select
        name={name}
        className={`mb-2 bg-white px-2 py-1 rounded-lg w-full border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100 ${classes}`}
        defaultValue={valueFormatFunction(defaultValue)}
        value={selected}
        onChange={onChange}
    >
        <option value={valueFormatFunction(defaultValue)} disabled={firstOptionDisabled}>
            {firstOptionDisplayFormatFunction
                ? firstOptionDisplayFormatFunction(defaultValue)
                : displayFormatFunction(defaultValue)}
        </option>
        {options.map((item: any, index: number) => (
            <option value={valueFormatFunction(item)} key={index}>
                {displayFormatFunction(item)}
            </option>
        ))}
    </select>
);

export default Select;
