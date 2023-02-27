interface ICheckoutLabelProps {
    text: string;
    classes?: string;
}

const Label = ({ text, classes }: ICheckoutLabelProps) => (
    <p className={`text-neutral-600 dark:text-white text-sm md:text-md font-medium mb-4 ${classes}`}>{text}</p>
);

export default Label;
