import serverAuth from '@/database/serverAuth';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/database/prismadb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
// * DELETE REQUESTS FOR SINGLE MOVIE
  if (req.method == 'DELETE') {
    // Check if the user is authenticated
    const { currentUser } = await serverAuth(req, res);
    // Get the movieId from the request body
    const { movieId } = req.query;

        //IF THE MOVIE ID IS NOT A STRING, THROW AN ERROR
    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }
        // IF THE MOVIE ID IS MISSING, THROW AN ERROR
    if (!movieId) {
      throw new Error('Missing Id');
    }
    // FIND THE MOVIE IN THE DATABASE
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });
        // IF THE MOVIE DOESN'T EXIST, THROW AN ERROR
    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });
    // RETURN THE UPDATED USER
    return res.status(200).json(updatedUser);
  }
//* GET REQUESTS FOR SINGLE MOVIE
    if (req.method !== 'GET') { 
        return res.status(405).end();
    }
        try {
            // Check if the user is authenticated
            await serverAuth(req, res);
            // Get the movieId from the request QUERY (not body) - CHECK NEXT.JS HELPERS
            const { movieId } = req.query;
            // IF THE MOVIE ID IS NOT A STRING, THROW AN ERROR
            if (typeof movieId !== 'string') {
                throw new Error('Invalid Id');
            }
            // IF THE MOVIE ID IS MISSING, THROW AN ERROR
            if (!movieId) {
                throw new Error('Missing Id');
            }


            // FIND THE MOVIE IN THE DATABASE
            const singleMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            // IF THE MOVIE DOESN'T EXIST, THROW AN ERROR
            if (!singleMovie) {
                throw new Error('Invalid ID');
            }
            // RETURN THE MOVIE
            return res.status(200).json(singleMovie);
        }
            // Catch any errors and return a 400 status code
        catch (error) {
            console.log(error);
            return res.status(400).end();
        }

}