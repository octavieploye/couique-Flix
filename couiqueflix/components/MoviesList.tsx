// * MoviesList component

import React from "react";
// isEmpty is a function from lodash that checks if an object is empty
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

// We define the props of the component
interface MoviesListProps {
    // data is an object that contains the data from the API. Record<string, any> is a type that means "an object with any keys and any values"
    data: Record<string, any>;
    title: string;
}
// MoviesList component that fetches the data from the API and displays it
const MoviesList: React.FC<MoviesListProps> = ({data, title}) => {
    // If the data is empty, return null
    if (isEmpty(data)) {
        return null
    }
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semiboldmb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2 ">
                    {data.map((movie: any) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
           
        </div>
    );
};
export default MoviesList;