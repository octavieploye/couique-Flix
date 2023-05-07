// ** useCurrentUser hook FROM CURRENT API**
// SWR allows to avoid using a State management library like Redux or MobX
import useSWR from 'swr'

import fetcher from "@/database/fetcher"

// Define useCurrentUser hook
const useCurrentUser = () => {
    // Fetch data from /api/user
    const { data, error, isLoading, mutate  } = useSWR('/api/current', fetcher)

    return {
        // Return data, error, isLoading and mutate function
        data,
        error,
        isLoading,
        mutate
    }

}

export default useCurrentUser