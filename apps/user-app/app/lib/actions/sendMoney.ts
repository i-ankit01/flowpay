'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function sendMoney(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "some error occured",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return {
      message: "user not found",
    };
  }

  
  // we are wrapping all these process in $transaction because we want that either all the process will be successfull or all fails 
  await prisma.$transaction(async (tx) => {

    // locking in postgresql
    // Use of FOR UPDATE is that It locks the selected rows for writing
    await tx.$queryRaw`SELECT * FROM "Balance" where "userId" = ${Number(userId)} FOR UPDATE` // this ensures No two transactions can hold a FOR UPDATE lock on the same row at the same time.

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(userId) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient money");
    }

    // decrease the balance of sender
    await tx.balance.update({
      where: { userId: Number(userId) },
      data: { amount: { decrement: amount } },
    });

    // increase the balance of reciever
    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });
  });
}
