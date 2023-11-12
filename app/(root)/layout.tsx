import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  //busca el usuario actual
  const { userId } = auth();

  if(!userId) {
    redirect('/sign-in');
  }

  //busca la tienda con ese id
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  // redirige a esa tienda con su dashboard
  if(store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
      {children}
    </>
  )


}