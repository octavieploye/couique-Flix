// **FavoritesButton component**
import axios from "axios";
import React, {useCallback, useMemo} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";


interface FavoritesButtonProps {
    movieId: string;
}
// SET THE FAVORITE BUTTON METHODS
const FavoritesButton: React.FC<FavoritesButtonProps> = ({movieId}) => {
// BOUND MUTATE USED AS A PATH TO MUTATE THE CURRENT KEY WITH DATA FROM THE MOUNTED SWR HOOK - SEE HOOKS FOLDER & SWR DOCUMENTATION
    const {mutate: mutateFavorites} = useFavorites();
    const {data: currentUser, mutate } = useCurrentUser();

    // CHECK IF THE MOVIE IS ALREADY IN THE FAVORITES LIST
    const isFavorite = useMemo(() => {
        // ARRAY OF FAVORITES MOVIES
        const list = currentUser?.favoriteIds || [];
        // RETURN THE LIST OF FAVORITES MOVIES FOR THE CURRENT USER
        return list.includes(movieId);
    },[currentUser, movieId]);

    // HANDLE THE POST & DELETE REQUESTS TO THE API - VIEW SIDE
    const toggleFavorite = useCallback(async () => {
        let response;
        // IF THE MOVIE IS ALREADY IN THE FAVORITES LIST, DELETE IT
        if (isFavorite) {
            response = await axios.delete(`/api/movieList/${movieId}`)
            console.log(response);
        }else {
            // IF THE MOVIE IS NOT IN THE FAVORITES LIST, ADD IT
            response = await axios.post('/api/movieList', {movieId});
        }
        //* UPDATE THE FAVORITES LIST USING THE MUTATE METHOD
        // CONST THAT CONTAINS THE UPDATED FAVORITES LIST
        const updatedFavoriteIds =response.data.favoriteIds;
        // MUTATE THE CURRENT USER KEY WITH THE UPDATED FAVORITES LIST
        mutate ({
            // SPREAD THE CURRENT USER KEY
            ...currentUser,
            // UPDATE THE FAVORITES LIST TO THE FAVORITEIDS FIELD FROM THE CURRENTUSER
            favoriteIds: updatedFavoriteIds
        })
        // UPDATE THE FAVORITES LIST USING THE MUTATE METHOD
        mutateFavorites();
        },[movieId, isFavorite, mutate, mutateFavorites, currentUser]);
        
        // TOGGLE THE ADD FAVORITE BUTTON ON CLICK
        const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div 
        onClick={toggleFavorite}
        className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">

    {/* toggle favorite button - add or check if movie already in the favorite list*/}
            <Icon className="text-white" size={25} />
          
        </div>
    );
};
export default FavoritesButton;
