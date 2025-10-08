import db from '@repo/db/client';
import  bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { signIn } from "next-auth/react";

export const authOptions = {
  // All the Providers that are provided by the next-auth will contain here

  providers: [
    CredentialsProvider({
      name: "Credentials", // this is written in the button "Sign In with Credentials"
      credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
      // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    // The jwt callback is used when you want to change something and embedd in jwt

    // jwt: async ({ user, token }: any) => {
    //   // console.log("This is user : " , user)
    //   // console.log("This is token : " , token)

    // if (user) {
    //     token.uid = user.id;
    // }
    // return token;
    // },
    session: ({ session, token, user }: any) => {
      // console.log("This is token" , token)
      // console.log( "This is session : " , session)
      if (session.user) {
        session.user.id = token.sub;
        // console.log(session.user.id)
      }
      return session;
    },
  },
//   pages : {
//     signIn : "/signin"
//   }
};
