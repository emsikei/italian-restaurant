/* eslint-disable react/button-has-type */
interface IButton {
    type: 'button' | 'reset' | 'submit' | undefined;
    text: string;
}
const Button = ({ type, text }: IButton) => (
    <button
        type={type}
        className="rounded-xl w-full bg-vp_brown-100 hover:bg-vp_brown-200 transition-all text-white py-1 focus:border focus:border-2-black font-medium"
    >
        {text}
    </button>
);

export default Button;
