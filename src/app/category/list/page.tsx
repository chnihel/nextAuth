
//on ajoute cteet use client pour declarer qui render est effectue cote client de cette condition on peut utiliser hooks
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface Category{
    _id:string;
    Name:string;
    discription:string
}
const ListCategory = () => {
    const [categories,setCategories]=useState<Category[]>([])
    
   
        const fetchCategories=async ()=>{
            try{
               const response=await fetch('http://localhost:3000/category')
               if(!response.ok){
                  throw new Error('Erreur lors de la récupération des données');
               }
               const data=await response.json()
               console.log("les donnees de database",data)
               const categories:Category[]=data.AllCategories
               setCategories(categories)
            }catch(err){
                console.log("erreur lors de la recuperation des donnes")
            }
        }
       
    useEffect(()=>{
        fetchCategories()
    },[])

    //delete data
    const deleteCateg=async (id:string)=>{
        try {
            const response=await fetch(`http://localhost:3000/category/${id}`,{
               method:"Delete",

            })
            fetchCategories()
        
        } catch (error) {
            console.log("erreur dans la supprission des donnees",error)
        }
    }

  return (
    <div>
        <h1>Liste des categories</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>description</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
            {categories.map((item,index)=>{
            return(
               <tr key={index}>
                 <td>{item.Name}</td>
                 <td>{item.discription}</td>
                 <td><button type='submit' style={{color:"blue"}} onClick={()=>deleteCateg(item._id)}>delete</button>
                 <Link  href={`/category/${item._id}`}>
                 <button type='submit' style={{color:"red"}}>update</button>
                 </Link >
                 </td>
                 

               </tr>
            )
        })}
            </tbody>
        </table>
        
      
    </div>
  )
}

export default ListCategory
