// * This file is responsible for the movieList API
import  prismadb  from '@/database/prismadb';
import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/database/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request is a GET request
    if(req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        // Check if the user is authenticated
        await serverAuth(req,res) ;
        // Get the movie list from the database
        const movieList = await prismadb.movie.findMany()

        // Return the movie list
        return res.status(200).json(movieList)
        // Catch any errors and return a 400 status code
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}