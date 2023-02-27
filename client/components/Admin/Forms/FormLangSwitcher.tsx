import { Dispatch, SetStateAction } from 'react';
import { LANGS } from '../../../constants';
import { generateUUID } from '../../../helpers';

interface IFormLangSwitcherProps {
    currentFormLang: string;
    setCurrentFormLang: Dispatch<SetStateAction<string>>;
}

const FormLangSwither = ({ currentFormLang, setCurrentFormLang }: IFormLangSwitcherProps) => (
    <div className="flex items-center">
        {LANGS.map((lang) => (
            <button
                key={generateUUID()}
                type="button"
                className={`font-medium px-4 py-2 transition-all rounded-md ${
                    lang === currentFormLang ? 'bg-vp_brown-100 text-white' : 'bg-white text-black'
                }`}
                onClick={() => setCurrentFormLang(lang)}
            >
                {lang}
            </button>
        ))}
    </div>
);

export default FormLangSwither;
