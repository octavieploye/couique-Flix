
// * Protect the server routes with a middleware

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from '@/database/prismadb';

import { authOtions } from "@/pages/api/auth/[...nextauth]";

// We create a function to protect the server routes
const serverAuth = async (req: NextApiRequest, res:NextApiResponse) => {
    // We use the getSession function from next-auth to get the session
    const session = await getServerSession(req, res, authOtions);
    // If the session does not exist
    if(!session?.user?.email){
        // We throw an error
        throw new Error("You are not signed in");
    }
    // We use the findUnique function from Prisma to find the user
    const currentUser = await prismadb.user.findUnique({
        // We use the email from the session to find the user
        where: {
            email: session.user.email,
        }
    })
    // If the user does not exist
    if(!currentUser){
        throw new Error("You are not signed in");
    }
    // We return the user
    return { currentUser };
}

export default serverAuth;