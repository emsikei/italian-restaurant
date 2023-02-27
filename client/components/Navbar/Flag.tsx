import { MouseEvent, ReactNode } from 'react';
import { useLocale } from '../../contexts/locale.context';

interface IFlagProps {
    lang: string;
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const Flag = ({ children, handleClick, lang }: IFlagProps) => {
    const { locale } = useLocale();

    return (
        <button
            type="button"
            className={`self-baseline mr-2 w-4 h-4 hover:cursor-pointer hover:opacity-100 transition-all  ${
                locale === lang ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Flag;
