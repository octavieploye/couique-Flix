import React from "react";
import Image from "next/image";

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <Image 
            className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-0 delay-300 w-full h-[12vw]"
            src={data.thumbnailUrl} 
            alt="movie" 
            width={400} 
            height={400}/>
        </div>
    );
};
export default MovieCard;