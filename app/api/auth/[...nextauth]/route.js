import { connectDB } from "@/lib/mongoDB";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        //this just for testing purposes below that i commented
        // const user = { id: "1" };
        // return user;

        //get data object from client side api
        const { email, password } = credentials; //destruct data from client side api

        try {
          await connectDB(); //connect to mongoDB
          const emailMatch =await User.findOne({ email }); //find user by email in mongoDB

          if (!emailMatch) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, emailMatch.password); //compare password

          if (!passwordMatch) {
             return null;
          }

          return emailMatch;
        } catch (error) {
          console.log(error)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", //json web token  //add secret next and go to .env add NEXTAUTH_SECRET and NEXTAUTH_URL
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",  //set at homepage
  },
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
