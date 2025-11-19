import Chatroom from "@/components/Chatroom";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import RoomInfo from "@/components/RoomInfo";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HomePage() {
  const user = (await auth.api.getSession({
    headers: await headers()
  }))?.user
  return (
    <div className="min-h-screen flex flex-col gap-6">
      <h1 className="m-4 text-center text-4xl">CH4TS3C</h1>
      {
        !user && (
          <div className="flex flex-col justify-center items-center gap-4">
            <LoginForm />
            <RegisterForm />
          </div>
        )
      }{
        user && (
          <div className="flex flex-row items-center justify-center gap-4">
            <Chatroom user={user} />
            <RoomInfo user={user} />
            {/* <h1>Hello World!</h1> */}
          </div>
        )
      }
    </div>
  );
}
