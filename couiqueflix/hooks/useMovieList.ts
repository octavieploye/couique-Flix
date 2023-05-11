// *This file is responsible for the movieList API
import  fetcher  from '@/database/fetcher';
import  useSWR  from 'swr';

const  useMovieList  = () => {
    const { data, error, isLoading } = useSWR('/api/movieList', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnConnect: false,
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useMovieList

