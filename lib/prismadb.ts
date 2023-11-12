import { PrismaClient } from "@prisma/client";

// se declara para agregar prisma al globalThis
declare global {
  var prisma: PrismaClient | undefined;
};

// se hace para que next no recargue un nuevo cliente de prisma cada vez que levante la db
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;