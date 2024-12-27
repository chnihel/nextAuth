"use client"
import { useSession } from "next-auth/react";
import Dashbord from "./components/Dashbord"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home=()=> {
  /* const message:string="hello wolrd"
  const age:number=20
  //TYPE definie dans lib de tsconfig
  let a:AddEventListenerOptions
  let b:NodeJS.Process=process
  console.log(b.cwd()) */

  const { data: session, status } = useSession();
  
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); 
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // 
  }

  return (
    <>
    {/* <div>{message},{age}</div> */}
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <Dashbord session={session} />
    </main>
    </>
  );
}
export default Home ;

