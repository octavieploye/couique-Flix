import React from "react";

interface ListDropdownProps {
    visible?: boolean;
}

const ListDropdown: React.FC<ListDropdownProps> = ({ visible }) => {
    if (!visible) {return null;}

    return (
        <div className='
       bg-black
       w-56
       absolute
       top-8
       left-0
       py-5
       flex-col
       border-b-2
       border-gray-800
       flex
        '>
            <div className="flex flex-col gap-4" >
                <div className="px-3 text-center text-white hover:underline">

                Home
                </div>
                    
                
            </div>
        </div>
    )
}

export default ListDropdown