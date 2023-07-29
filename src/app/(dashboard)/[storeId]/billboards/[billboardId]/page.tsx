import { BillboardForm } from "@/app/(dashboard)/_components/billboard-form";
import prismadb from "@/lib/prismadb";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return <BillboardForm initialData={billboard} />;
}
