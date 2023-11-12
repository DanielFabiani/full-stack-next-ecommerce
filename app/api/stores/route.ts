import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST (req: Request, res: Response) {
  try {
    // autenticación de la ruta POST
    // extraemos el userId que da clerk
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // creo la tienda
    const store = await prismadb.store.create({
      data: { 
        name,
        userId,
      }
    });

    return NextResponse.json(store);

  } catch (error) {
    //para saber que el error viene de esta petición
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal Error",  { status: 500});
  }
}