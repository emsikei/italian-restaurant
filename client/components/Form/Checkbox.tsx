import { ChangeEvent } from 'react';

interface ICheckboxtProps {
    value?: boolean;
    label: string;
    name: string;
    classes?: string;
    checked: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ value, label, name, classes, handleChange, checked }: ICheckboxtProps) => (
    <div className="flex items-center gap-2">
        <input
            className={`cursor-pointer ${classes}`}
            checked={checked}
            type="checkbox"
            name={name}
            onChange={handleChange}
        />
        <span className="font-medium text-sm">{label}</span>
    </div>
);

export default Checkbox;
