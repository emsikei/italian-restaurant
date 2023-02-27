import { useEffect, useState } from 'react';

export default function useKeyPress(targetKey: string, callback: Function): boolean {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const keyHandler = ({ key }: any) => {
        if (key === targetKey) {
            setKeyPressed(true);
            callback();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
        };
    }, []);

    return keyPressed;
}
