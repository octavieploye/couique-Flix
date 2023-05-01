import NextAuth from "next-auth/next";
import prismadb from '@/database/prismadb';
import Credentials from "next-auth/providers/credentials";
import  { compare }  from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        Credentials ({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email:{
                    label: "Email",
                    type: "text",
                },
                password:{
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password){
                    throw new Error("Email and password are required");
                }
                // We use the findUnique function from Prisma to find the user
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                // If the user does not exist or does not have a hashed password
                if(!user || ! user.hashedPassword){
                    throw new Error("Email does not exist");
                }
                // We use the compare function from bcrypt to compare the password
                const isCorrectPassword = await compare(
                    credentials.password, 
                    user.hashedPassword);
                // If the password is incorrect
                    if(!isCorrectPassword){
                        throw new Error("Password is incorrect");
                    }
                    return user
            }
        })
    ],
    
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    // We use the PrismaAdapter to connect NextAuth to our Providers GOOGLE & GITHUB
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
})