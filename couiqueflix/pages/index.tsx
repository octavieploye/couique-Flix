import Navbar from "@/components/Navbar"
import useCurrentUser from "@/hooks/useCurrentUser"
// We import the NextPageContext type to define the context of the getServerSideProps function
import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"
import Billboard from "@/components/Billboard"


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
export default function Home() {
  // Get the current user
  const { data: user } = useCurrentUser()
  return (
    <>
      < Navbar />
      <Billboard />

    </>
  )
}
