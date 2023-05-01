Dependencies:
NEXT_TYPESCRIPT
- npx create-next-app --typescript

TAILWINDCSS
https://tailwindcss.com/docs/guides/nextjs
- yarn add  -D tailwincss postcss autoprefixer
- npx tailwindcss init

PRISMA
- yarn add -D  prisma
- yarn prisma init
- yarn add @prisma/client
**Handle prisma db and Prisma client**
     1- create prismdb.ts in a lib or db folder within the root app
     2- create global.d.ts file 

MONGODB
- create the database in mongodb Atlas
- Select : connect via vsc code GET the link to paste in .ENV file then replace the pwd by the one we selected when creating the db
- At the end of the URL we will have .test which is the name of the db but can be changed
- ** MONGODB USE _ID AND OBJECTID
- create the prisma.schrma model
- then push the database in mongodb
  
- yarn prisma db push

=================================================
AUTHENTICATION
- yarn add next-auth 
- yarn add bcrypt
- yarn add -D @types/bcrypt

User CONNECT TO THE DB
- yarn add axios
- register.ts

CREATE NEXTAUTH FILE, REGISTER FILE -> ADD REGISTER AND LOGIN FUNCTION, REDIRECT TO HOME IF SUCCESSFULL

SIGNIN WITH GOOGLE, FACEBOOK...ETC
- yarn add react-icons
  
  Then import IN AUTH.TSX:
  import { FcGoogle  } from "react-icons/fc"
  import { FaGithub } from "react-icons/fa"

  .ENV:
GITHUB_ID = 
GITHUB_SECRET =

GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =

NEXTAUTH: 
- import GithubProvider and GoogleProvider
- add them with their clientID and clientSecret to nextauth providers []

- yarn add @next-auth/prisma-adapter
- import { PrismaAdapter } from "@next-auth/prisma-adapter";

HOOKS

- yarn add swr