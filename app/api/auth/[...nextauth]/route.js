import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const user = { id: "1" };
        return user;
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
