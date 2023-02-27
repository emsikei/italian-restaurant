interface IEditProps {
    handleClick: () => void;
}

const Edit = ({ handleClick }: IEditProps) => (
    <button
        type="button"
        className="font-medium cursor-pointer text-white bg-vp_brown-100 p-2 rounded-md transition-all hover:bg-vp_brown-200"
        onClick={handleClick}
    >
        Editare
    </button>
);

export default Edit;
