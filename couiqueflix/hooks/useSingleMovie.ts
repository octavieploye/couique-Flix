// *THIS IS THE HOOK THAT WILL BE USED IN THE SINGLE MOVIE PAGE

import useSWR from 'swr';
import fetcher from '@/database/fetcher';

const useSingleMovie = (id?: string) => {
    const { data, error, isLoading } = useSWR(id ? `/api/movieList/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnConnect: false,
    });

    return {
        data,
        error,
        isLoading
    }
}
export default useSingleMovie;