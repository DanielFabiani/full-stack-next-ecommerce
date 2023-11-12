import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout ({
  children,
  params
} : {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  //confirma el id del store y del usuario
  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId,
    }
  });

  //si no existe vuelve a /
  if (!store) {
    redirect('/');
  }

  //si existe el id store retorna lo que haya en el componente y page (children)
  return (
    <>
      <div>This will be a navbar</div>
      {children}
    </>
  )
}