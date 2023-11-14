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

    const { label, imageUrl } = body;

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if(!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if(!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
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
    const billboard = await prismadb.billboard.create({
      data: { 
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard);

  } catch (error) {
    //para saber que el error viene de esta petición
    console.log('[BILLBOARDS_POST]', error);
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

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  return NextResponse.json(billboards);

} catch (error) {
  //para saber que el error viene de esta petición
  console.log('[BILLBOARDS_GET]', error);
  return new NextResponse("Internal Error",  { status: 500});
}
}