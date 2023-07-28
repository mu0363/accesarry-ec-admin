"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  // NOTE:
  /**
   * 通常通りの定数で読み込むとuseEffect内で使用できないため下記の方法で読み込む
   * const onOpen = useStoreModal((state) => state.onOpen);
   * const isOpen = useStoreModal((state) => state.isOpen);
   */
  // QUESTION: あれ? 大丈夫そう...

  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div>Root page</div>;
}
