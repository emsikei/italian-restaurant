import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface INavigationButtonProps {
    type: 'prev' | 'next';
    handleClick: () => void;
}

const NavigationButton = ({ type, handleClick }: INavigationButtonProps) => (
    <button
        type="button"
        className="w-8 h-8 text-sm block py-1 px-2 mx-1 cursor-pointer transition-all border border-vp_brown-100 rounded-md hover:text-white hover:bg-vp_brown-100"
        onClick={handleClick}
    >
        {type === 'prev' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </button>
);

export default NavigationButton;
