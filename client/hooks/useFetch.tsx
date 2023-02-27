import { useEffect, useState } from 'react';
import { fetcher } from '../lib/fetcher';

export default function useFetch<T>(initialValue: T, url: string): { loading: boolean; data: T } {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T>(initialValue);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const [error, fetchedData] = await fetcher<T>(url);

            if (!error && fetchedData) setData(fetchedData);
            setLoading(false);
        };
        fetch();
    }, []);

    return { loading, data };
}
