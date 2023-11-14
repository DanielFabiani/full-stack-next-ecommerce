import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST (
    req: Request,
    {params}: { params: { storeId: string }}
  ) {
  try {
    // autenticación de la ruta POST
    // extraemos el userId que da clerk
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if(!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if(!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if(!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({ 
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // creo el fondo de pantalla
    const size = await prismadb.size.create({
      data: { 
        name,
        value,
        storeId: params.storeId
      }
    });

    return NextResponse.json(size);

  } catch (error) {
    //para saber que el error viene de esta petición
    console.log('[SIZES_POST]', error);
    return new NextResponse("Internal Error",  { status: 500});
  }
}

export async function GET (
  req: Request,
  {params}: { params: { storeId: string }}
) {
try {

  if(!params.storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  return NextResponse.json(sizes);

} catch (error) {
  //para saber que el error viene de esta petición
  console.log('[SIZES_GET]', error);
  return new NextResponse("Internal Error",  { status: 500});
}
}