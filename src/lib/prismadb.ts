import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
// NOTE:
/**
 * const prismadb = new PrismaClient();
 * にしてしまうとNext.13の場合、ホットリロードのたびにインスタンス化されて
 * 開発パフォーマンスが下がるため下記処理を追加した
 */
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
export default prismadb;
