import { PrismaClient } from '@prisma/client'

//** We save prismaClient in a globalglobal.d.ts  file that is not affected by nextAuth loading  multiple instances of PrismaClient*/

const client = global.prismadb || new PrismaClient()
if(process.env.NODE_ENV === 'production') global.prismadb = client

export default client