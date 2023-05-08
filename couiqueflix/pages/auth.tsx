
import Input from "@/components/input"
import Image from "next/image"
import { useState, useCallback } from "react"

import axios from "axios"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { NextPageContext } from "next"

import { FcGoogle  } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
  }

// Auth page - Sign In Input setup
const Auth = () => {
// HOOK TO EXPORT THE ROUTER AFTER WE SUCCESSFULLY LOGIN TO THE HOME PAGE
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    // WE  CREATE A TOGGLE BETWEEN LOGIN AND THE REGISTER HERE
    const [variant, setVariant] = useState('login')
    // WE USE THE USECALLBACK HOOK TO APPLY THE LOGIC IN THE LOGIN/REGISTER EVENTS
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    },[])
    // Login function - connect to the API
        const login = useCallback(async () => {
            try {
                // we use the signIn function from next-auth
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                    // we set the callbackUrl to the homepage
                    callbackUrl: '/'
                })
                router.push('/profiles')
            }catch(error) {
                console.log(error)
            }
            // we add the dependencies to the array as we need to be in sync with the state
            // we add the router to the array as we need to be in sync with the state
        }, [email, password, router])

    // REGISTER FUNCTION - CONNECT TO THE API
    const register = useCallback(async () => {
        try {
            await axios.post('api/register', {
                email,
                name,
                password
            })

            // we call the login function after we register
            login()
        }catch(error) {
            console.log(error)

        }
        // we add the dependencies to the array as we need to be in sync with the state
    },[email, name, password, login])




    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
                <div className=" bg-black w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5">
                        <Image 
                        src="/images/logo.png" 
                        alt="logo" 
                        className="h-12"
                        width={100}
                        height={100}
                         />

                    </nav>
                        {/* SIGN IN SECTION */}
                    <div className="flex justify-center">
                        {/* SIGN IN BOX */}
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2  lg:w-2/5 lg:max-w-md rounded-md w-full ">

                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                {/* SIGNIN LOGIC */}
                                {variant === 'login' ? 'Sign In' : 'Register'}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {/*LOGIC FOR REGISTER - (SHOWS THE USERNAME INPUT VS LOGIN)  */}
                                {variant === 'register' && (
                                    <Input
                                    label='Username'
                                    onChange={(ev: any) => setName(ev.target.value)}
                                    id="Username"
                                    value={name}
                                    />
                                )}
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
                                value={password}
                                />
                            </div>
                            {/* LOGIN / REGISTER BUTTON */}
                            <button 
                            // WE USE THE VARIANT STATE TO TOGGLE THE LOGIN OR REGISTER LOGIC
                            onClick={variant === 'login' ? login : register}
                            className="bg-red-600 py-3  text-white rounded-md w-full mt-10 hover-bg-red-700 transition ">
                                {/* TOGGLE BUTTON LOGIN OR REGISTER LOGIC */}
                                {variant === 'login' ? 'Login' : 'Sign Up'}
                            </button>

                            {/* ADDING GOOGLE, GITHUB,FACEBOOK SIGNIN OPTIONS */}
                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                {/* GOOGLE */}
                                <div 
                                onClick={() => signIn('google',{callbackUrl: '/profiles'})}
                                className=" 
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                ">
                                    <FcGoogle size={30} />
                                </div>
                                {/* GITHUB  */}
                                <div 
                                onClick={() => signIn('github',{callbackUrl: '/profiles'})}
                                
                                className=" 
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                                ">
                                    <FaGithub size={30} />
                                </div>
                            </div>

                            <p className="text-neutral-500 mt-12">
                                
                                {/* TOGGLE LOGIN OR REGISTER  LOGIC */}
                                {variant === 'login' ? "First Time using CouiqueFlix?" : "Already have an account?"}
                                <span 
                                onClick={toggleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer">
                                    {/* TOGGLE LOGIN OR CREATE AN ACCOUNT */}
                                    {variant === 'login' ? 'Create an Account' : 'Login'}
                                </span>


                            </p>
                        </div>

                    </div>

                </div>
        </div>
    )
}

export default Auth