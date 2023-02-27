import { Dispatch, SetStateAction } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useOutsideClick from '../../hooks/useOutsideClick';
import useTranslations from '../../hooks/useTranslations';

interface IDescriptionBox {
    text?: string;
    showBox: boolean;
    setShowBox: Dispatch<SetStateAction<boolean>>;
}

const DescriptionBox = ({ text, showBox, setShowBox }: IDescriptionBox) => {
    const ref = useOutsideClick(() => setShowBox(false));

    const t = useTranslations();

    return (
        <div
            ref={ref}
            className={`absolute -bottom-1 self-end p-1.5 w-11/12 rounded-xl z-50 bg-zinc-700 transition-all ease-in-out duration-200 ${
                showBox ? 'visible opacity-90 scale-1' : 'invisible opacity-0 scale-0'
            }`}
        >
            <div className="w-full flex justify-end">
                <button
                    type="button"
                    aria-label="moreinfo-close-button"
                    className="text-white rounded-full w-4 h-4 flex justify-center items-center"
                    onClick={() => setShowBox(!showBox)}
                >
                    <AiOutlineCloseCircle />
                </button>
            </div>
            <p className="text-white text-center text-sm pb-3 px-3">{text || t.noDescription}</p>
        </div>
    );
};

export default DescriptionBox;
