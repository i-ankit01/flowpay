import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { signIn } from "next-auth/react";

export const authOptions = {
  // All the Providers that are provided by the next-auth will contain here

  providers: [
    CredentialsProvider({
      name: "Credentials", // this is written in the button "Sign In with Credentials"
      credentials: {
        username: { label: "email", type: "text", placeholder: "Enter Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials: any) {
        // Do the database checks and validations here
        const username = credentials.username;
        const password = credentials.password;

        // This is supposed to be returned by the database
        return {
          id: "user1",
          name: "Ankit",
          userId: "ankit123",
          email: "ankit@gmail.com",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
