'use client'

import React, { useState } from 'react';
import { sendMoney } from '../../lib/actions/sendMoney';

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-96 p-6 border rounded-lg flex flex-col gap-4 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-center mb-2">Payment Form</h2>

        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Enter amount in ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button 
          onClick={(async ()=>{
            await sendMoney(phoneNumber, Number(amount)*100)
          })}
          type="submit" 
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;

