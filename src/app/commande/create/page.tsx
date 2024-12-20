"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateCommande = () => {
    const [data,setData]=useState({
        Price:0,
        quantity:0
    })
    const [message, setMessage] = useState('');
    const router=useRouter()

    const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const onSubmitHandler=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const response=await fetch("/api/commande",{
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(data)
            })
            if(response.ok){
                const data=await response.json()
                console.log('les donne ajoute',data)
                router.push('/commande/liste')
                setMessage(data.message)
            }else{
                setMessage('Erreur lors de la création de la commande')
            }

        }catch(err)
        {
             console.error("erreur",err)
             setMessage('une erreur se produit')
        }
    }
  return (
    <div>
       <h1>Créer une nouvelle commande</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Produit:</label>
          <input
            type="number"
            name="Price"
            value={data.Price}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <label>Quantité:</label>
          <input
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit">Créer la commande</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default CreateCommande
