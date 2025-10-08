"use client";
// import { useRouter } from "next/navigation"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  // const router = useRouter()
  const session = useSession();
  return (
    <div>
      <div className="flex gap-15">
        {/* You can use useRouter also, but simply you can use the signin and the signout function provided by the next-auth also */}

        {/* <button onClick={()=>{
                router.push("/api/auth/signin")
            }} className="px-2 py-2 border rounded cursor-pointer">Sigin</button> */}

        <button
          onClick={() => {
            signIn();
          }}
          className="px-2 py-2 border rounded cursor-pointer"
        >
          SignIn
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          className="px-2 py-2 border rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="mt-10">Client Side Component</div>

      <div className=" border h-32 w-full">{JSON.stringify(session)}</div>
    </div>
  );
}
