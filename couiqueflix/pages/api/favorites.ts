
// * THIS FILE CONTAINS THE "GET" FAVORITE ROUTE
import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/database/prismadb';
import serverAuth from '@/database/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request is a GET request
if(req.method !== 'GET') {
    // If not, return a 405 status code
        return res.status(405).end()
    }
console.log('im a favorite error before the try');
    try {
        // Check if the user is authenticated
        const { currentUser } = await serverAuth(req,res) ;
        console.log('im a favorite error after the serverAuth');
      
        // Get the user's favorite movies
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    // Filter the movies by the user's favoriteIds
                    in: currentUser?.favoriteIds
                }
            }
        })
        console.log('im a favorite error before the return');
        // Return the favorite movies
        return res.status(200).json(favoriteMovies)
        // Catch any errors and return a 400 status code
    } catch (error) {
        console.log(error);
        console.log('Im a favorite return error');
        return res.status(400).end()
        
    }
}

