import { signOut, getSession } from "next-auth/react"
// We import the NextPageContext type to define the context of the getServerSideProps function
import { NextPageContext } from "next"

import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MoviesList from "@/components/MoviesList"
import useCurrentUser from "@/hooks/useCurrentUser"
import useMovieList from "@/hooks/useMovieList"
import useFavorites from "@/hooks/useFavorites"


// This is a protected page
export async function getServerSideProps(context: NextPageContext) {
  // Get the user's session based on the request
  const session = await getSession(context)


  // If no session, redirect to login page
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  // If there is a session, return the current user
  return {
    props: {}
  }

}
// home page
const Home = ()  => {
const {data: movies =[]} = useMovieList()

  // Get the current user
  const { data: user } = useCurrentUser()
  const {data: favorites =[]} = useFavorites()
  return (
    <>
      < Navbar />
      <Billboard />
    <div className="pb-40">
      <MoviesList title="Trending Now" data={movies} />
      <MoviesList title="My List" data={favorites} />
    </div>
    </>
  )
}
export default Home
