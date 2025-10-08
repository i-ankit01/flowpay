
import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  
  //transactions
  await db.balance.update({
    where : {
      userId : paymentInformation.userId
    },
    data : {
      amount : {
        increment : paymentInformation.amount
      }
    }
  })

  await db.onRampTransaction.update({
    where : {
      token : paymentInformation.token // identifying by token because this ensures no user hit the backend directly without initializing a transaction
    },
    data : {
      status : "Success"
    }
  })

  res.status(200).json({
    message : "captured"
  })

  //update balance in db and add transaction
});
