/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useOutsideClick from '../../hooks/useOutsideClick';
import Cart from './Cart';

interface ICartPopUpProps {
    showCartPopUp: boolean;
    setShowCartPopUp: Dispatch<SetStateAction<boolean>>;
}

const CartPopUp = ({ showCartPopUp, setShowCartPopUp }: ICartPopUpProps) => {
    const ref = useOutsideClick(() => setShowCartPopUp(false));

    return (
        <div
            ref={ref}
            className={`absolute bg-white dark:bg-black right-0 px-9 py-8 rounded-xl border border-vp_brown-100 transition-all ease-in-out overflow-y-scroll w-[80vw] sm:w-auto max-h-[90vh] ${
                showCartPopUp ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className="absolute right-2 top-2 w-6 h-6 rounded-full text-center hover:cursor-pointer flex justify-center items-center"
                onClick={() => setShowCartPopUp(false)}
            >
                <AiOutlineClose />
            </div>
            <Cart type="popup" />
        </div>
    );
};

export default CartPopUp;
