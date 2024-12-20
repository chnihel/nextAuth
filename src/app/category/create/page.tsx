"use client"; // Indique que ce composant est un composant client

import React, { useState } from 'react'

const CreatePublications = () => {
    const [data,setData]=useState({
      Name: '',
      discription: ''
        
    })
    const onChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const onSubmitHandler=async(e:React.FormEvent)=>{
        e.preventDefault()
        const reponse=await fetch('http://localhost:3000/category',{
           method:'POST',
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify(data)
        })
        if(reponse.ok){
            console.log("publication created")
        }else{
            console.log("erreur dans la creation")
        }
    }
    return (
        <div>
          <form onSubmit={onSubmitHandler}>
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
      );
}

export default CreatePublications
