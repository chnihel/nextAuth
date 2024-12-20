
//on ajoute cette" use client" pour declarer qui render est effectue cote client de cette condition on peut utiliser hooks
"use client"
;
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
interface Commande{
    _id:string;
    Price:number;
    quantity:number
}
const ListCommande = () => {
    const [commandes,setcommandes]=useState<Commande[]>([])
    
   
        const fetchcommandes=async ()=>{
            try{
               const response=await fetch('/api/commande',{
                method:"GET"
               })
               if(!response.ok){
                  throw new Error('Erreur lors de la récupération des données');
               }
               const data=await response.json()
               console.log("les donnees de database",data)
               
               setcommandes(data)
            }catch(err){
                console.log("erreur lors de la recuperation des donnes")
            }
        }
       
    useEffect(()=>{
        fetchcommandes()
    },[])
    const deleteData=async(id:string)=>{
        try{
            const response=await fetch(`/api/commande?id=${id}`,{
                method:"DELETE"
            })
            fetchcommandes()

        }catch(error){
            console.error("Erreur lors de la suppression :", error);
        }

    }


  return (
    <div>
        <h1>Liste des commandes</h1>
        <table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>quantity</th>
                   
                </tr>
            </thead>
            <tbody>
            {commandes.map((item,index)=>{
            return(
               <tr key={index}>
                 <td>{item.Price}</td>
                 <td>{item.quantity}</td>
                 
                 <td><button type='submit' onClick={()=>deleteData(item._id)}>effacer</button>
                 <Link href={`/commande/${item._id}`}>
                 <button type='submit'>update</button></Link></td>
                 
                 

               </tr>
            )
        })}
            </tbody>
        </table>
        
      
    </div>
  )
}

export default ListCommande
