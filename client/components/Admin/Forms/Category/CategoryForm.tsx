import { ChangeEvent } from 'react';
import Input from '../../../Form/Input';
import { CategoryCreate, ICategory } from '../../../../types/category';
import { LANG_TABLE } from '../../../../constants';
import Label from '../../../Form/Label';
import { CategoryValidationErrors } from '../../../../types/validation';

interface ICategoryFormProps {
    formValues: ICategory | CategoryCreate;
    errors: CategoryValidationErrors;
    lang: 'ro' | 'ru' | 'en';
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const CategoryForm = ({ lang, formValues, errors, handleChange }: ICategoryFormProps) => (
    <div className="w-[50%]">
        <Label text={LANG_TABLE[lang].admin.categoryName} />
        <Input
            classes="py-4"
            value={formValues.translations[lang].name}
            placeholder={LANG_TABLE[lang].admin.categoryName}
            name="name"
            error={errors.translations[lang].name}
            handleChange={(e) => handleChange(e, formValues.translations[lang], `translations-${lang}`)}
        />
    </div>
);

export default CategoryForm;
