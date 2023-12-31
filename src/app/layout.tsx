import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/components/providers/modal-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

import prismadb from "@/lib/prismadb";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EC admin dashboard",
  description: "EC admin dashboard",
};

// NOTE:
/**
 * 大元のlayout.tsにCreateStoreモーダルを配置することにより
 * わざわざそれぞれのコンポーネントでモーダルを読み込まなくても
 * どのページでもモーダルを開けるようになる
 */
// QUESTION: SCは機能しているのか?

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = prismadb.store.findMany();
  return (
    <ClerkProvider>
      <html lang="ja">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
