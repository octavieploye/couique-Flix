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

AUTHENTICATION
- yarn add next-auth 
- yarn add bcrypt