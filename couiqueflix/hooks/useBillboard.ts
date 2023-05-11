//* Hook to fetch data from the API/random

import  useSWR  from 'swr';
import fetcher  from '@/database/fetcher';

const useBillboard = () => {
    // * SWR is a React Hooks library for remote data fetching
    // Extract data, extract error, extract isLoading from the useSWR hook that will target the /api/random endpoint
    const { data, error ,isLoading} = useSWR('/api/random', fetcher, { 
        // * We open an options object to disable SWR's auto revalidation
        // we only want to load the data once the user uses the page
    revalidateIfStale: false,
    // Disable revalidation on focus
    revalidateOnFocus: false,
    // Disable revalidation on reconnect
    revalidateOnConnect: false,
})
// Return the data, error and isLoading
    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard