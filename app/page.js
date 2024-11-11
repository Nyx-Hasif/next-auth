import LogIn from "@/components/LogIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // use redirect for serer side and use useRouter for client side
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard"); //if user in dashboard session want to go to login session..it will redirect back to dashboard session

  return (
    <div>
      <LogIn />
    </div>
  );
}
