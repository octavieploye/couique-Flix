import Image from 'next/image'
import NavbarItem from './NavbarItem'
// IMPORT chevron icon
import {BsChevronDown, BsSearch, BsBell}    from 'react-icons/bs'
import ListDropdown from './ListDropdown'
import { useCallback, useState } from 'react'





const Navbar = () => {
    // CREATE A STATE FOR THE DROPDOWN MENU
    const [showListDropdown, setShowListDropdown] = useState(false)
    // CREATE A FUNCTION TO TOGGLE THE DROPDOWN MENU
    const toggleListDropdown = useCallback(() => {
        setShowListDropdown((current) => !current)
    }, [])

    return (
        <nav className="w-full fixed  z-40">
            <div className="
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            bg-zinc-900
            bg-opacity-90 
            ">
                <Image  
                // className='h-4 lg:h-7'
                src="/images/logo.png"  
                alt="logo" 
                width={100}
                height={300}
                />

                {/* NAVBAR LIST - " HIDDEN " ON SMALL SCREENS */}
                <div 
                className='
                hidden 
                flex-row
                px-4
                items-center
                space-x-2
                gap-7
                lg:flex

                '>
                  
                    <NavbarItem label='Home' />
                    <NavbarItem label='TV Shows' />
                    <NavbarItem label='Films' />
                    <NavbarItem label='New & Popular' />
                    <NavbarItem label='My List' />
                    <NavbarItem label='Browse by Languages' />
                </div>

                {/* NAVBAR BROWSE VERTICALLY FOR SMALL SCREEN */}
                <div 
                onClick={toggleListDropdown}
                className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>
                        Browse
                    </p>
                    {/* CHEVRON ARROW - TOGGLE DROPDOWN MENU */}
                    <BsChevronDown className = "text-white transition "/>

                {/* DROPDOWN MENU */}
               <ListDropdown visible={showListDropdown} />
                </div>

                {/* SEARCH, BELL ICONS */}
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                    <BsBell />
                    </div>
                {/* PROFILE */}
                    <div className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-sm overflow-hidden'>
                            <Image src="/images/profile-red.png" alt="profile-red" width={200} height={200} />
                        </div>
                        <BsChevronDown className = "text-white transition "/>
                        <AccountMenu />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar