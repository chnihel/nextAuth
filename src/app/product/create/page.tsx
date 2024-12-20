"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateProduct = () => {
  const [data,setData]=useState({
    Ref:"",
    Price:0,
    Description:"",
    Qnt:0
  })
  const [gal,setGal]=useState<FileList |null>(null)
  const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    //parseFloat pour convertir la valeur en nombre avant de l'enregistrer dans l'état
    setData({
      ...data,
      //? si :: sinon [name]:value
      [name]:name==="Price" || name==="Qnt" ? parseFloat(value):value
    })
  }
  const router=useRouter()
  const changeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){
      setGal(e.target.files)
    }
  }
  const onSubmitHandler=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      // formdata n'accepte que le chaine de caractere pour cela on modifier number en string
      const formData=new FormData()
      formData.append('Ref', data.Ref);
    formData.append('Price', data.Price.toString());
    formData.append('Description', data.Description);
    formData.append('Qnt', data.Qnt.toString());

    // Ajouter des fichiers au formData
    if (gal) {
      for (let i = 0; i < gal.length; i++) {
        formData.append('files', gal[i]);
      }
    }
      const response=await fetch("http://localhost:3000/product",{
        method:"POST",
        body:formData,
      })
      if(response.ok){
        const responseData = await response.json();
        router.push('/product/list')
        console.log("product est ajoute",responseData)
      }else{
        
        const errorData = await response.json(); // Essayez de récupérer les détails de l'erreur du serveur
        console.error("Erreur côté serveur:", errorData);

      }
    }catch(err){
      console.error("Erreur réseau ou autre problème:", err);
    console.log("Impossible d'ajouter le produit, veuillez vérifier")
    }
    
  }

  return (
    <div>
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Product</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">ref</label>
                    <input onChange={changeHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='Ref' />{/* chaque input doive avoiur un name ce name c'est le meme attribut dans le bacend (name)*/}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">price</label>
                    <input onChange={changeHandler} type="test" className="form-control" id="exampleInputPassword1" name='Price'/>{/* chaque input doive avoiur un name ce name c'est le meme attribut dans le bacend (discription)*/}
                  </div>
                  
                  
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">descreption</label>
                    <input onChange={changeHandler} type="test" className="form-control" id="exampleInputPassword1" name='Description' />{/* chaque input doive avoiur un name ce name c'est le meme attribut dans le bacend (discription)*/}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">qte</label>
                    <input onChange={changeHandler} type="test" className="form-control" id="exampleInputPassword1" name='Qnt' />{/* chaque input doive avoiur un name ce name c'est le meme attribut dans le bacend (discription)*/}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Galeries</label>
                    <input onChange={changeImage} type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='files'  multiple/>{/* chaque input doive avoiur un name ce name c'est le meme attribut dans le bacend (image)*/}
                  </div>
                  {/*<select name="subcategory" id="" onChange={changeHandler}>
                    <option selected disabled>ListeSubcategory</option>
                    {subcateg.map((item)=>{
                      return (
                        <option value={item._id}>{item.name}</option>
                      )
                    })}
                  </select>*/}
                 
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreateProduct
