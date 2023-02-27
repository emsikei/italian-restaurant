interface IDeleteProps {
    handleClick: () => void;
}

const Delete = ({ handleClick }: IDeleteProps) => (
    <button
        type="button"
        className="font-medium cursor-pointer text-white p-2 rounded-md bg-red-500 transition-all hover:bg-red-600"
        onClick={handleClick}
    >
        Șterge
    </button>
);

export default Delete;
