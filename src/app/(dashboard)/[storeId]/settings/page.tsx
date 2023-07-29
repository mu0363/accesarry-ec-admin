import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/settings-form";

type Props = {
  params: {
    storeId: string;
  };
};

const checkAuthAndStore = async (storeId: string) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) redirect("/");
  return store;
};

export default async function Settings({ params }: Props) {
  const store = await checkAuthAndStore(params.storeId);

  return (
    <div>
      <div className="p-8 pt-6 flex-1">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
