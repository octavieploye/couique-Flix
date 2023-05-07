// * THIS IS THE MOVIE CARD COMPONENT
import React from "react";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import FavoritesButton from "./FavoritesButton";
import { useRouter } from "next/router";

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {
    // Define the ROUTER
    const router = useRouter();
    return (
        // CARD CONTAINER
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            {/* THUMBNAIL IMAGES FROM DB */}
            <Image 
            className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-0 delay-300 w-full h-[12vw]"
            src={data.thumbnailUrl} 
            alt="movie" 
            width={400} 
            height={400}/>
            {/* HOVER EFFECT CONTAINER */}
            <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">
                {/* THUMBNAIL HOVER EFFECT FROM DB */}
                <Image 
                className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
                src={data.thumbnailUrl} 
                alt="movie" 
                width={400} 
                height={400} />

                {/* MOVIE INFO CONTAINER */}
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                   
                {/* PLAY BUTTON CONTAINER  */}
                    <div className="flex flex-row items-center gap-3">
                        {/* WHITE CIRCLE - PLAY ICON CONTAINER */}
                        <div 
                        className="
                        cursor-pointer
                        w-6
                        h-6
                        lg:w-10
                        lg:h-10
                        bg-white
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:bg-neutral-300
                        "
                        // * ONCLICK ROUTER TO WATCH MOVIE
                        onClick={() => router.push(`/watch/${data.id}`)}
                        >
                        {/* ADD PLAY ICON */}
                        <BsFillPlayFill size={30} />
                        </div>
                        {/* FAVORITES MOVIES BUTTON COMPONENT ADDED */}
                        <FavoritesButton movieId={data?.id} />
                    </div>
                    {/* MOVIE INFO - YEAR OF RELEASE */}
                    <p className="text-teal-400 font-semibold mt-4">
                        New <span className="text-white"> Release 2023 </span>
                    </p>
                    {/* MOVIE DURATION - CONTAINER  */}
                    <div className=" flex flex-row mt-4 gap-2 items-center">
                        {/* MOVIE DURATION - STYLING*/}
                        <p className="text-white text-[10px] lg:text-sm">
                            Duration: {data.duration}
                        </p>
                    </div>
                    {/* MOVIE GENRE- CONTAINER  */}
                    <div className=" flex flex-row mt-4 gap-2 items-center">
                        {/* MOVIE GENRE - STYLING*/}
                        <p className="text-white text-[10px] lg:text-sm">
                            Genre: {data.genre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieCard;