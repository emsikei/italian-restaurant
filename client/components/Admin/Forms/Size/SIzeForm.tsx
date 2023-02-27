import { ChangeEvent } from 'react';
import Input from '../../../Form/Input';
import { LANG_TABLE } from '../../../../constants';
import Label from '../../../Form/Label';
import { SizeValidationErrors } from '../../../../types/validation';
import { ISize, SizeCreate } from '../../../../types/size';

interface ISizeFormProps {
    formValues: ISize;
    errors: SizeValidationErrors;
    lang: 'ro' | 'ru' | 'en';
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const SizeForm = ({ lang, formValues, errors, handleChange }: ISizeFormProps) => (
    <div className="w-[50%]">
        <Label text={LANG_TABLE[lang].admin.sizeValue} />
        <Input
            classes="py-4"
            value={formValues.translations[lang].value}
            placeholder={LANG_TABLE[lang].admin.sizeValue}
            name="value"
            error={errors.translations[lang].value}
            handleChange={(e) => handleChange(e, formValues.translations[lang], `translations-${lang}`)}
        />
    </div>
);

export default SizeForm;
