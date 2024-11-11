//this is in server side
import Registerform from "@/components/Registerform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // use redirect for serer side and use useRouter for client side
import { authOptions } from "../api/auth/[...nextauth]/route";

const Register = async () => {
  const session = await getServerSession(authOptions); // Dapatkan sesi pengguna semasa menggunakan konfigurasi authentication
  if (session) redirect("/dashboard"); // Jika pengguna sudah log masuk (mempunyai sesi), terus ke dashboard

  return <Registerform />;
};

export default Register;
