
"use client"
/*
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const updateData = ({params}:{params:{id:string}}) => {
    const [data,setData]=useState({
     _id:"",
     Name:"",
     discription:""
    })
    const router=useRouter()
    const onChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    
    const updateData=async (e:React.FormEvent)=>{
        e.preventDefault()
        const response=await fetch(`http://localhost:3000/category/${params.id}`,{
            method:"Put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log('les donnees sont mettre a jour')
        }else{
            console.log("erreur lors de la mise a jour")
        }
    }
  return (
    <div>
          <form onSubmit={updateData}>
            <input
              type="text"
              name="Name"
              placeholder="name"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="discription"
              placeholder="Description"
              onChange={onChangeHandler}
              required
            />
            
            <button type='submit'>submit</button>
          </form>
        </div>
  )
}

export default updateData*/


import { useRouter } from 'next/navigation'; // Assurez-vous d'importer depuis next/navigation
import React, { useState, useEffect } from 'react';

interface Category {
    _id: string;
    Name: string;
    discription: string;
}

const UpdateData = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    const [data, setData] = useState<Category>({
        _id: "",
        Name: "",
        discription: ""
    });

    // Fetch initial data to populate the form
   useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                try {
                    const response = await fetch(`http://localhost:3000/category/${params.id}`);
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const updateData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/category/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // Envoyer les données mises à jour
            });

            if (response.ok) {
                console.log('Les données ont été mises à jour');
                router.push('/category/list'); // Rediriger vers la liste après mise à jour
            } else {
                console.log("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.log('Erreur lors de la requête', error);
        }
    };

    return (
        <div>
            <h1>Mettre à jour la catégorie</h1>
            <form onSubmit={updateData}>
                <input
                    type="text"
                    name="Name"
                    placeholder="Nom"
                    value={data.Name}
                    onChange={onChangeHandler}
                    required
                />
                <input
                    type="text"
                    name="discription"
                    placeholder="Description"
                    value={data.discription}
                    onChange={onChangeHandler}
                    required
                />
                <button type='submit'>Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateData;

