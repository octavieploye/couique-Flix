// * THIS FILE IS ONLY FOR PRISMA CLIENT TO RESOLVE PRISMADB ERROR

// ensures that an instance of PrismaClient is accessible globally via the prismadb variable
import { PrismaClient } from "@prisma/client";

declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}