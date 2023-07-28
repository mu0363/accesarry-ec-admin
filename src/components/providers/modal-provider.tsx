"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

// What it does?
// layout.tsに配置したいが、layout.tsはサーバーコンポーネントなのでクライアントコンポーネントは配置できない。
// SCではモーダルがないにも関わらずCCではモーダルがマウントされるためhydrationエラーが出る。
// useEffectを使うことによってhydrationが完了するまでモーダルをマウントさせないようにする。
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // まだサーバーサイドの時の処理
  if (!isMounted) return null;

  // hydrationが終わったクライアントサイドの時の処理
  return (
    <>
      <StoreModal />
    </>
  );
};
