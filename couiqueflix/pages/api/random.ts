// * RANDOM ENDPOINT
// * This API route will return a random movie object from the database

import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/database/serverAuth';
import prismadb from '@/database/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We limit this handle to Only allow GET request to this API route
    if(req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        // Only checks if the user is authenticated, we don't need a return value or a response
        await serverAuth(req,res) ;

        //  Get the count of movies in the database w/o loading them
        const movieCount = await prismadb.movie.count()
        // Generate a random number(Integer from the movie count) between 0 and the movie count
        const randomIndex = Math.floor(Math.random() * movieCount)
        // Get a random movie object from the database
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })
        // Return the random movie object
        return res.status(200).json(randomMovies[0])

    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}