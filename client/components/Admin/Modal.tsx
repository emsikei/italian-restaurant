/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import useKeyPress from '../../hooks/useKey';

interface IModalProps {
    children: ReactNode;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, active, setActive }: IModalProps) => {
    const escapePressed = useKeyPress('Escape', () => {
        setActive(false);
    });

    return (
        <div
            className={`h-screen w-screen bg-black transition-all bg-opacity-50 fixed left-0 top-0 flex justify-center items-center ${
                active ? `opacity-100 pointer-events-all` : `opacity-0 pointer-events-none`
            }`}
            onClick={() => setActive(false)}
        >
            <div
                className={`p-11 relative rounded-md bg-white w-[50vw] max-h-[90%] overflow-y-auto ${
                    active ? 'scale-100 transition-all' : 'scale-50 transition-all'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute right-4 top-4">
                    <div onClick={() => setActive(false)}>
                        <GrClose />
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
export default Modal;
