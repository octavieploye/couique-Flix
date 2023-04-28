import Input from "@/components/input"
import Image from "next/image"
import { useState } from "react"


// Auth page - Sign In Input setup
const Auth = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
                <div className=" w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5">
                        <Image 
                        src="/images/logo.png" 
                        alt="logo" 
                        className="h-12"
                        width={100}
                        height={100}
                         />

                    </nav>
                    <div className="flex justify-center">
                        {/* SIGN IN BUTTON */}
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2  lg:w-2/5 lg:max-w-md rounded-md w-full ">

                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                Sign In
                            </h2>
                            <div className="flex flex-col gap-4">
                                <Input
                                label='Username'
                                onChange={(ev: any) => setName(ev.target.value)}
                                id="Username"
                                value={name}
                                />
                                <Input
                                label='Email'
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                                />
                                <Input
                                label='Password'
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={email}
                                />
                            </div>
                        </div>

                    </div>

                </div>
        </div>
    )
}

export default Auth