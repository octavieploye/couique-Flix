// * This file is responsible for the movieList API
import  prismadb  from '@/database/prismadb';
import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/database/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // HANDLER FOR POST REQUESTS
        if(req.method === "POST") {
            
            // Check if the user is authenticated
            const { currentUser } = await serverAuth( req, res) ;
            // Get the movieId from the request body
            const { movieId } = req.body
            // FIND THE MOVIE IN THE DATABASE
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            })
            // IF THE MOVIE DOESN'T EXIST, THROW AN ERROR
            if(!existingMovie) {
                throw new Error('Movie not found')
            }
            // UPDATE THE USER'S FAVORITES
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                // ADD THE MOVIE TO THE USER'S FAVORITES(FAVORITEIDS -SEE PRISMA SCHEMA-)
                data: {
                    favoriteIds: {
                        // PUSH THE MOVIE ID TO THE FAVORITEIDS ARRAY
                        push: movieId
                    }
                }
            })
            
            // RETURN THE UPDATED USER
            return res.status(200).json(user)
        }
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


    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}