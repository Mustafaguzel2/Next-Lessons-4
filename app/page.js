import { redirect } from "next/navigation";
import { fetchAuthenticatedUser } from "../actions";
import LogOut from "@/components/log-out";

export default async function Home() {

  const currentUser = await fetchAuthenticatedUser();
  console.log(currentUser);

  if(currentUser?.success === false) {
      redirect('/sign-in');
  }
  return (
    <div>
      <h1>Next JS Authentication</h1>
      <h2>Welcome {currentUser?.data?.userName}</h2>
      <p>Email: {currentUser?.data?.email}</p>
      <LogOut />
    </div>
  );
}
