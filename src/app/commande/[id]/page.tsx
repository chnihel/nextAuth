"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
 interface Commande{
    _id:string;
    Price:number;
    quantity:number


 }
const updateData = ({params}:{params:{id:string}}) => {
    const [data,setData]=useState<Commande>({
        _id:"",
        Price:0,
        quantity:0
    })
    const router=useRouter()
    
    const onchangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                try {
                    const response = await fetch(`/api/commande?id=${params.id}`,{
                        method:'GET'
                    });
                    if (!response.ok) throw new Error('Erreur de récupération des données');
                    const categoryData = await response.json();
                    setData(categoryData);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
        //[params.id] dans le tableau de dépendances de useEffect assure que les données sont récupérées chaque fois que l'ID change,
    }, [params.id]);
    const updateData=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const response=await fetch(`/api/commande?id=${params.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            if(response.ok){
                console.log('Les données ont été mises à jour');
                router.push('/commande/liste')
            }else {
                console.log("Erreur lors de la mise à jour");
            }

        }catch(error){
            console.log('Erreur lors de la requête', error);

        }

    }

  return (
    <div>
            <h1>Mettre à jour la catégorie</h1>
            <form onSubmit={updateData}>
                <input
                    type="number"
                    name="Price"
                    placeholder="Price"
                    value={data.Price}
                    onChange={onchangeHandler}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="quantity"
                    value={data.quantity}
                    onChange={onchangeHandler}
                    required
                />
                <button type='submit'>Mettre à jour</button>
            </form>
        </div>
  )
}

export default updateData
