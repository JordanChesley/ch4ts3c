import AdminPanel from "@/components/AdminPanel";
import Chatroom from "@/components/Chatroom";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import RoomInfo from "@/components/RoomInfo";
import { authClient } from "@/lib/auth-client";

export default async function HomePage() {
  const { data, error } = await authClient.getSession()
  if (data) {
    console.log(data.user)
  } else if (error) {
    console.log(`Error: ${error.message}`)
  }
  const user = data?.user

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <h1 className="m-4 text-center text-4xl">CH4TS3C</h1>
      {
        (user?.id === 'NaCcUTnUPzFpdwa7VMUJOoFloMkm7Ksg') && <AdminPanel />
      }
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
