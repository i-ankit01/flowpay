"use server"; // make all the actions a server session to ensure that the frontend knows that this needs to be called on server as if we dont put that it might called on the clied 'add money' compo

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import axios from "axios";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session.user.id;

  if (!userId) {
    return {
      message: "User is not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      status: "Processing",
      amount,
      provider,
      startTime: new Date(),
      token,
    },
  });

  try {
    const response = await axios.post("http://localhost:5000/bankWebhook", {
      token,
      user_identifier: userId,
      amount,
    });

    if(response.status == 200){
        console.log("Payment Successfull , Balance updated")
    }
  } catch (e) {
    console.log("bank server failed")
  }

  return {
    message: "On ramp transaction is added",
  };
}
