import Image from 'next/image'
import NavbarItem from './NavbarItem'

const Navbar = () => {
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
                <div 
                className='
                flex
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
            </div>
        </nav>
    )
}

export default Navbar