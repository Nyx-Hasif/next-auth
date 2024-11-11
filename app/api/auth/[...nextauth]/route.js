// Import dependency yang diperlukan
import { connectDB } from "@/lib/mongoDB"; // Sambung ke database
import User from "@/models/user"; // Model user dari MongoDB
import bcryptjs from "bcryptjs"; // Untuk verify password
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"; // Login guna email/password

// Konfigurasi Authentication
export const authOptions = {
  // Pilih provider login (dalam ini guna email/password)
  providers: [
    CredentialsProvider({
      name: "Credentials", // Nama provider
      credentials: {}, // Boleh customize input fields

      // Fungsi untuk verify login
      async authorize(credentials) {
        // Dapatkan email dan password dari input
        const { email, password } = credentials;

        try {
          // Sambung ke database
          await connectDB();

          // Cari user dengan email yang dimasukkan
          const user = await User.findOne({ email });

          // Jika user tidak jumpa
          if (!user) {
            return null; // Login gagal
          }

          // Bandingkan password yang dimasukkan dengan password dalam database
          const passwordMatch = await bcryptjs.compare(password, user.password);

          // Jika password tidak sepadan
          if (!passwordMatch) {
            return null; // Login gagal
          }

          // Jika login berjaya, return maklumat user
          return {
            id: user._id.toString(), // ID user
            email: user.email, // Email user
            name: user.username, // Nama user
          };
        } catch (error) {
          console.log("Authentication Error:", error);
          return null;
        }
      },
    }),
  ],

  // Callback untuk modify token dan session
  callbacks: {
    // Modify JWT token
    async jwt({ token, user }) {
      // Jika ada user baru login, tambah info ke token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    // Modify session dengan info dari token
    async session({ session, token }) {
      // Tambah info user ke session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },

  // Gunakan JWT untuk simpan session
  session: {
    strategy: "jwt",
  },

  // Rahsia untuk encrypt token
  secret: process.env.NEXTAUTH_SECRET,

  // Customize page login
  pages: {
    signIn: "/", // Guna homepage sebagai login page
  },
};

// Create handler untuk route authentication
const handler = NextAuth(authOptions);

// Export handler untuk GET dan POST request
export { handler as GET, handler as POST };


////////////////////////////////////////////////////
// Sambung ke database                            //
// Cari user dengan email yang dimasukkan         //  
// Verify password                                //  
// Jika login berjaya, create token dan session   //
// Simpan maklumat user dalam token dan session   //
// Perkara yang perlu ada:                        //
//                                                //
// Environment variable NEXTAUTH_SECRET           //
// Sambungan database yang betul                  //
// Model user yang lengkap                        // 
////////////////////////////////////////////////////