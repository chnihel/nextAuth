import Dashbord from "../../components/Dashbord"

export default function Home() {
  /* const message:string="hello wolrd"
  const age:number=20
  //TYPE definie dans lib de tsconfig
  let a:AddEventListenerOptions
  let b:NodeJS.Process=process
  console.log(b.cwd()) */
  return (
    <>
    {/* <div>{message},{age}</div> */}
    <main className="max-w-7xl mx-auto my-12 space-y-5">
      <Dashbord/>
    </main>
    </>
  );
}
