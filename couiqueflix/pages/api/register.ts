import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/database/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We limit this handle to Only allow POST request to this API route
    try {
    if(req.method !== 'POST') {
        return res.status(405).end()
    } 
        // extract the value from the body
        const {email, name, password } =req.body

        // check if the email already exist
        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })
        // if user already exist, return error
        if(existingUser) {
            return res.status(422).json({ error: 'email already exist'})
        }

        // The code uses bcrypt to hash a password with a salt and cost factor of 12, returning a promise with the hashed password.
        const hashedPassword = await bcrypt.hash(password, 12)

        // We want to save the above hashed password to the database in a new user model
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image:'',
                emailVerified: new Date(),
            }
        })
        // return the user
        return res.status(200).json(user)

    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Something went wrong'})
    }
}