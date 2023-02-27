/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import useKeyPress from '../../hooks/useKey';
import { RequestError } from '../../types/errors';

interface IModalProps {
    handlePositiveAnswer: () => void;
    value: string;
    setActive: Dispatch<SetStateAction<boolean>>;
    requestError: string | RequestError;
}

const Confirm = ({ value, setActive, handlePositiveAnswer, requestError }: IModalProps) => (
    <div className="text-center">
        <p className="mb-2">
            Sunteți siguri că vreți să ștergeți <span className="font-bold">"{value}"</span>
        </p>
        <div className="w-full flex justify-center gap-2">
            <button
                type="button"
                className="w-14 h-11 text-sm text-center block cursor-pointer rounded-md p-2 border border-stone-500 hover:bg-stone-300"
                onClick={handlePositiveAnswer}
            >
                Da
            </button>
            <button
                type="button"
                className="w-14 h-11 text-sm text-center block cursor-pointer rounded-md p-2 border border-stone-500 bg-vp_brown-100 hover:bg-vp_brown-200 transition-all text-white"
                onClick={() => setActive(false)}
            >
                Nu
            </button>
        </div>
        <p className="ml-1 mt-2 text-xs text-red-500">{requestError.toString()}</p>
    </div>
);

export default Confirm;
