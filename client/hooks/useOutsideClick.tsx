import { useRef, useEffect } from 'react';

export default function useOutsideClick(callback: any) {
    const ref = useRef<any>();

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (callback) {
                    callback();
                }
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [callback]);

    return ref;
}
