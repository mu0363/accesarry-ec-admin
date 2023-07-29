import prismadb from "@/lib/prismadb";

type Props = {
  params: { storeId: string };
};

export default async function Dashboard({ params }: Props) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      <p>Active store: {store?.name}</p>
    </div>
  );
}
