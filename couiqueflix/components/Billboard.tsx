import useBillboard from "@/hooks/useBillboard";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
    const { data } = useBillboard()
    return (
        // Aspect ratio 21:9 of the movies loading
        <div className="relative h-[56.25vw] ">
            {/* fetch the random video and the thumbnail, and play it on mute and looping */}
            <video 
            className="w-full h-[56.25vw] brightness-[60%] object-cover"
            autoPlay
            muted
            loop
            poster={data?.thumbnailUrl} 
            src={data?.videoUrl}>

            </video>

            <div className="absolute top=[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full  w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <button className="bg-white text-white bg-opacity-30 flex flex-row py-1 md:py-2 px-2 md:px-4 w-auto items-center text-xs lg:text-lg rounded-md  font-semibold hover:bg-opacity-20">
                    <AiOutlineInfoCircle className="mr-1"/>
                        More Info   
                    </button>
                </div>

            </div>
       
        </div>
    );
    };
export default Billboard;