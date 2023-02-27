interface ICart {
    width: number;
    height: number;
}

const Cart = ({ width, height }: ICart) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 15.83"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={`${width}px`}
        height={`${height}px`}
    >
        <defs />
        <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
                <polygon className="cls-1" points="13.42 15.33 2.58 15.33 0.5 4.08 15.5 4.08 13.42 15.33" />
                <path className="cls-1" d="M4.32,4.08c-.07-4.78,7.43-4.77,7.36,0" />
                <line className="cls-1" x1="11.68" y1="4.08" x2="11.68" y2="6.08" />
                <line className="cls-1" x1="4.32" y1="4.08" x2="4.32" y2="6.08" />
            </g>
        </g>
    </svg>
);

export default Cart;
