import React from 'react'
import { signOut } from "next-auth/react";
import Image from 'next/image'
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> =({visible})=> {
    const {data} = useCurrentUser()
    if(!visible) return null

    return (
        // ACCOUNT MENU BOX
        <div className='absolute top-14 right-0 w-56 py-5 bg-zinc-800 border-gray-300 rounded-md flex flex-col '>
             <div className="flex flex-col gap-3">
                 <div className="px-3 group/item flex flex-row gap-3 items-center w-full text-white hover:underline">
                    {/* PROFILE IMAGE */}
                 <Image className="w-8 rounded-sm" src="/images/profile-red.png" alt="profile" width={200} height={200} />
                {/* UPDATE THE USERNAME */}
                <p className='text-white text-sm group-hover/item:underline'>
                    {data?.name}
                </p>
                </div>
                
                <hr className="bg-gray-600 border-0 h-px my-4" />
                {/* SIGNOUT  */}
                <div 
                onClick={() => signOut()}
                className='px-3 text-center text-white text-sm hover:underline'>
                Sign Out of Couiqueflix
                </div>
                         
             </div>
           
        </div>
    )
}

export default AccountMenu