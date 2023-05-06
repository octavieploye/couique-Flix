import React from "react";

interface ListDropdownProps {
    visible?: boolean;
}

const ListDropdown: React.FC<ListDropdownProps> = ({ visible }) => {
    if (!visible) {return null;}

    return (
        <div className='
        bg-zinc-800
       w-56
       absolute
       rounded-md
       top-8
       left-0
       py-5
       flex-col
       border-b-2
       border-gray-800
       transition
       duration-2000
       flex
        '>
            <div className="flex flex-col gap-4" >
                <div className="px-3 text-center text-white hover:underline">
                Home
                </div>
                <div className="px-3 text-center text-white hover:underline">
                TV Shows
                </div>
                <div className="px-3 text-center text-white hover:underline">
                Films
                </div>
                <div className="px-3 text-center text-white hover:underline">
                New & Popular
                </div>
                <div className="px-3 text-center text-white hover:underline">
                My List
                </div>
                <div className="px-3 text-center text-white hover:underline">
                Browse by Languages
                </div>
                    
                
            </div>
        </div>
    )
}

export default ListDropdown