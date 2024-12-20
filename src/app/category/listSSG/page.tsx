import React from 'react'

interface Category{
    _id:string;
    Qnt:number;
    Price:number
}
async function fetchCategory():Promise<Category[]> {
    const res=await fetch("http://localhost:3000/order",{cache:'no-store'})//// 'no-store' force SSR, sinon c'est SSG
    if(!res.ok){
        throw new Error("failed to fetch data")
    }
    const data=await res.json()
    console.log("les donnee",data.getorder)
    

    return data.getorder

}
const ListeSSG = async() => {
    const categories=await fetchCategory()
  return (
    <div>
      {categories?.map((item)=>(
        <li key={item._id}>{item.Qnt}:{item.Price}</li>
      ))}
    </div>
  )
}

export default ListeSSG
