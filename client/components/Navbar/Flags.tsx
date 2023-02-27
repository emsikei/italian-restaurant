import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useLocale } from '../../contexts/locale.context';
import { MD, RU, UK } from '../../svg/flags';
import Flag from './Flag';

const flagsTable = [
    { lang: 'ro', component: <MD /> },
    { lang: 'ru', component: <RU /> },
    { lang: 'en', component: <UK /> },
];

interface IFlagsProps {
    setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}

const Flags = ({ setShowSidebar }: IFlagsProps) => {
    const { changeLocale } = useLocale();

    const handleLocaleChange = (e: MouseEvent<HTMLButtonElement>, lang: string): void => {
        changeLocale(lang);
        // eslint-disable-next-line no-unused-expressions
        setShowSidebar ? setShowSidebar(false) : null;
    };

    return (
        <>
            {flagsTable.map((flag, index) => (
                <Flag key={index} lang={flag.lang} handleClick={(e) => handleLocaleChange(e, flag.lang)}>
                    {flag.component}
                </Flag>
            ))}
        </>
    );
};

export default Flags;
