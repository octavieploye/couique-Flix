import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
// IMPORT chevron icon
import {BsChevronDown, BsSearch, BsBell}    from 'react-icons/bs'

import NavbarItem from './NavbarItem'
import ListDropdown from './ListDropdown'
import AccountMenu from './AccountMenu'

// GETS BACKGROUND DARKER WHEN SCROLLING
const TOP_OFFSET = 66

const Navbar = () => {
    // CREATE A STATE FOR THE DROPDOWN MENU
    const [showListDropdown, setShowListDropdown] = useState(false)
    // CREATE A STATE FOR THE ACCOUNT MENU
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    // CREATE A STATE FOR THE BACKGROUND GETTING DARKER WHEN SCROLLING
    const [showBackground, setShowBackground] = useState(false)

    // CREATE A USEEFFECT TO HANDLE THE SCROLL FOR THE BACKGROUND TO GET DARKER
    useEffect(() => {
        // CREATE A FUNCTION TO HANDLE THE SCROLL
        const handleScroll = () => {
            if (window.scrollY>=  TOP_OFFSET)  {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
           
        }
        // ADD EVENT LISTENER TO THE scroll EVENT
        window.addEventListener('scroll', handleScroll)
        // REMOVE EVENT LISTENER ON THE UNMOUNT FUNCTION IN USEEFFECT
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    // CREATE A FUNCTION TO TOGGLE THE DROPDOWN MENU
    const toggleListDropdown = useCallback(() => {
        setShowListDropdown((current) => !current)
    }, [])
    // CREATE A FUNCTION TO TOGGLE THE ACCOUNT MENU
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)

    },[])

    return (
        <nav className="w-full fixed  z-40">
            <div className=
       {`     px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
           
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            
            `}
            >
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
                    {/* CHEVRON ARROW -> ROTATE WHEN  CLOSING & OPENING - TOGGLE DROPDOWN MENU */}
                    <BsChevronDown className = {`text-white transition ${showListDropdown ? 'rotate-180' : 'rotate-0'}`} />

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
                {/* PROFILE MENU */}
                    <div
                    onClick={toggleAccountMenu}
                     className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-sm overflow-hidden'>
                            <Image src="/images/profile-red.png" alt="profile-red" width={200} height={200} />
                        </div>
                        {/* ROTATE CHEVRON WHEN CLOSING & OPENING ACCOUNT MENU */}
                        <BsChevronDown className = {`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar