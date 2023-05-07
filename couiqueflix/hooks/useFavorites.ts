//* THIS FILE CONTAINS THE FAVORITES HOOK
import  useSWR  from 'swr';
import fetcher from '@/database/fetcher';

//  THIS HOOK IS RESPONSIBLE FOR THE FAVORITES API
const useFavorites = () => {
    //  USE THE SWR HOOK TO FETCH THE FAVORITES API
    const { data, error, isLoading,mutate } = useSWR('/api/favorites', fetcher, {
        // Disable revalidation
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnConnect: false,
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}
export default useFavorites