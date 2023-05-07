
// * THIS FILE CONTAINS THE METHODS "POST" & "DELETE" FOR THE FAVORITE API
import { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash'

import prismadb from '@/database/prismadb';
import serverAuth from '@/database/serverAuth';

// * SET POST & DELETE REQUESTS METHODS FOR THE FAVORITE API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('im a favorite request');
    console.log( 'Request method from hander function',req.method);
    try {
        // HANDLER FOR POST REQUESTS
        if(req.method === "POST") {
            // Check if the user is authenticated
            const { currentUser } = await serverAuth(req,res) ;
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
        //* HANDLER DELETE REQUEST
        console.log('im before delete request');
        if(req.method === "DELETE") {
            console.log('im a delete request');
            // Check if the user is authenticated
            const { currentUser } = await serverAuth(req,res) ;
            console.log("currentUser",currentUser);
            // Get the movieId from the request body
            const { movieId } = req.body
            
            // FIND THE MOVIE IN THE DATABASE
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })
            console.log(`existingMovie to be removed: ${existingMovie}`);
            // IF THE MOVIE DOESN'T EXIST, THROW AN ERROR
            if(!existingMovie) {
                throw new Error('Movie not found')
            }
            // FILTER THE FAVORITEIDS ARRAY TO REMOVE THE MOVIE ID
            // const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

            // UPDATE THE USER'S FAVORITES
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                // REMOVE THE MOVIE FROM THE USER'S FAVORITES(FAVORITEIDS -SEE PRISMA SCHEMA-)
                data: {
                    // SET THE FAVORITEIDS TO THE UPDATED FAVORITEIDS ARRAY
                    // favoriteIds: updatedFavoriteIds
                    favoriteIds: {
                        set: without(currentUser.favoriteIds, movieId)  
                    }
                }
            })
            // RETURN THE UPDATED USER
            return res.status(200).json(updatedUser)
        }
        // IF THE REQUEST IS NEITHER A POST OR DELETE REQUEST, THROW AN ERROR
        return res.status(405).end()
        // ERROR HANDLING
    } catch (error) {
        console.log(error);
        return res.status(400).end()
        
    }

}