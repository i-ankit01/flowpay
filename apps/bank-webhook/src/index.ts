
import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/bankWebhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  console.log(paymentInformation)
  
  //transactions
  await db.balance.update({
    where : {
      userId : Number(paymentInformation.userId)
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


app.listen(5000)