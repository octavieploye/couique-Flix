// * PlayButton component for the billboard video, the movieList and favorites/myList

import React from 'react';
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from 'next/router';

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    // NEXTJS ROUTER
    const router = useRouter();

    return (
        // PLAY BUTTON
        <button 
        onClick={() => router.push(`/watch/${movieId}`)}
        className="
        bg-white 
        cursor-pointer 
        rounded-md 
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex 
        flex-row
        justify-center 
        items-center 
        transition hover:bg-neutral-300">
            {/* Play Icon */}
            <BsFillPlayFill size={25} className='mr-1-1'/>
            Play
        </button>
    )
}
export default PlayButton;  