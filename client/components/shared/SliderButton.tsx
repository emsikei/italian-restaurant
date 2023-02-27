import React from 'react';

interface ISliderButtonProps {
    cls: string;
    children: React.ReactNode;
    type: 'prev' | 'next';
    location: 'modal' | 'banner' | 'product';
}

const SliderButton = ({ cls, children, type, location }: ISliderButtonProps) => (
    <button
        type="button"
        aria-label="slider-button"
        className={`${cls} ${
            type === 'prev' ? '-left-12' : '-right-12'
        } top-1/2 -translate-y-1/2 absolute w-9 h-9 bg-white dark:text-black md:flex justify-center items-center rounded-full ${
            location === 'modal' ? 'hidden' : 'hidden'
        }`}
    >
        {children}
    </button>
);

export default SliderButton;
