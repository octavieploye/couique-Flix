// * This page is for watching a movie

import React from 'react';
import { useRouter } from 'next/router';
import useSingleMovie from '@/hooks/useSingleMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
    // DEFINE THE ROUTER
    const router = useRouter();
    // DEFINE THE MOVIE ID
    const { movieId } = router.query;
    // DEFINE THE MOVIE DATA
    const { data, error, isLoading } = useSingleMovie(movieId as string);

    if (isLoading) {
        return ('Loading...')
    }
    if (error) {
        return <div>Error</div>
    }
    if (!data) {
        return <div>Not found</div>
    }
    return (
        // * THIS IS THE WATCH PAGE
        <div className='h-screen w-screen bg-black '>
            {/* WATCH NAVIGATION BAR */}
            <nav 
                className='
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-70
                '>
                {/* WATCH BACK BUTTON */}
                <AiOutlineArrowLeft  
                onClick={() => router.push('/')}
                className='text-white cursor-pointer transition-transform hover:scale-125 hover:text-neutral-300' 
                size={40}/>
                {/* WATCHING: MOVIE TITLE */}
                <p className='text-white text-1xl md:text-3xl font-bold'>
                    <span className='font-light'>
                        Watching: 
                    </span>
                {data.title}
                </p>
            </nav>
            {/* WATCH VIDEO CONTAINER */}
            <video 
            autoPlay
            controls
            className='h-full w-full object-cover'
            src={data.videoUrl}>

            </video>
            
        </div>
    )
}
export default Watch;