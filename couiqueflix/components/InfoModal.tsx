// **INFO MODAL COMPONENT - RENDERING OF THE STORE MORE INFO **

import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoritesButton from "./FavoritesButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useSingleMovie from "@/hooks/useSingleMovie";


//   This is the InfoModal component
interface InfoModalProps {  
    visible?: boolean;
    onClose:any
}
const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    //  This is the state of the modal
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);
    // This is the state of the movieId
    const { movieId } = useInfoModalStore();
    // This is the state of the movie
    const { data = {} } = useSingleMovie(movieId);

        
    useEffect(() => {
        
        setIsVisible(!!visible);
    }, [visible]);

    // CLOSE THE MODAL WITH SETTIMEOUT EFFECT
  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
        onClose()
    }, 300);
  }, [onClose]);

  if(!visible) {
        return null
  }
    return (
        // MODAL CONTAINER
        <div className="
        z-50
        transition
        duration-300
        bg-black
        bg-opacity-80
        flex
        justify-center
        items-center
        overflow-y-auto
        overflow-x-hidden
        fixed
        inset-0
        ">
            <div className="
            relative
            w-auto
            mx-auto
            max-w-3xl
            rounded-md
            overflow-hidden
            "> 

                {/* MODAL CONTENT */}
            
                <div className={`
                ${isVisible ? "scale-100" : "scale-0"}
                transform
                duration-300
                relative
                flex-auto
                bg-zinc-900
                drop-shadow-md
                `}>
                    {/* MODAL LAYOUT - SIMILAR THAN MOVIECARD */}
                    <div className="relative h-96">
                        {/* VIDEO PLAYING  */}
                        <video 
                        className="
                        w-full
                        brightness-[60%]
                        object-cover
                        h-full
                        "
                        autoPlay
                        muted
                        loop
                        poster={data?.thumbnailUrl}
                        src={data?.videoUrl}
                        >
                        </video>
                        <div 
                        className="
                        absolute
                        cursor-pointer
                        top-3
                        right-3
                        h-10
                        w-10
                        rounded-full
                        bg-black
                        bg-opacity-70
                        flex
                        items-center
                        justify-center
                        "
                        // CLOSE THE MODAL
                        onClick={handleClose}>
                            {/* LINE CLOSE ICON */}
                            <AiOutlineClose className="text-white text-2xl" size={20} />
                        </div>
                        {/* MEDIA INFO, PLAY, ADD/REMOVE CONTAINER */}
                        <div className="
                        absolute
                        bottom-[10%]
                        left-10
                        ">
                            <p className="text-white text-3xl md-text-4xl h-full lg:text-5xl font-bold mb-80">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoritesButton movieId={data?.id} />
                            </div>

                        </div>

                    </div>
                    {/* MOVIE INFO CONTAINER IN MODAL */}
                    <div className="px-12 py-8">
                        <p className="text-teal-400 font-semibold text-lg">
                            New Release
                        </p>
                        <p className="text-white text-2xl font-bold">
                            {data?.title}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default InfoModal;


