import clientPromise from "@/lib/mondobd";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

async function connectDataBase() {
  const client=await clientPromise
  const db=client.db('nextdata')
  const collection1=db.collection("orders")
  return collection1
  
}
export async function POST(request:Request) {
    const body=await request.json();
    console.log("nouvelle commande",body);
    try{
         
         const collection=await connectDataBase()
          const result=await collection.insertOne(body)
          //La propriété acknowledged fait partie de l'objet de retour 
          //que MongoDB renvoie après une opération d'insertion (comme insertOne ou insertMany). que peut etre true ou false
          if(result.acknowledged){
            return NextResponse.json({ 
                message: 'Commande créée avec succès!', 
                data: { 
                  ...body, // Les données envoyées
                  _id: result.insertedId // L'ID généré
                } 
              }, { status: 201 });

          }else{
            return NextResponse.json({ message: 'Échec de la création de la commande.' }, { status: 500 });

          }
    }catch(error){
        console.error("Erreur lors de la création de la commande:", error);
        return NextResponse.json({ message: 'Erreur interne du serveur.' }, { status: 500 });
    }    
}
export async function GET() {
    // Simulation d'une récupération de données
   try{
       const collection=await connectDataBase()
       const result=await collection.find({}).toArray()//// Récupère tous les documents de la collection
       return NextResponse.json(result)
   }catch{
    return NextResponse.json({
      message:'erreur lors de la recuperation des donnees'
    })

   }
  }
  //getbyId
  export async function GETBYID(request:Request) {
    try{
        const {searchParams}=new URL(request.url)
        const id=searchParams.get('id')
        if(!id){
          return NextResponse.json({message:"id does not existe"},{status:400})

        }
        const collection=await connectDataBase()
        const result=await collection.findOne({_id:new ObjectId(id)})
        return NextResponse.json(result)
    }catch{
      console.error("erreur de getData")
      return NextResponse.json({
       message:"erreeeur"
      })
    }
    
  }
  export async function DELETE(request:Request) {
    try{
      //rechercher l'id de element depuis url
      const {searchParams}=new URL(request.url)
      const id=searchParams.get('id')
      if(!id){
        return NextResponse.json({message:"id does not existe"},{status:400})
      }
      const collection=await connectDataBase()
      const result=await collection.deleteOne({_id:new ObjectId(id)})
      return NextResponse.json(result)

    }catch(err){
       console.error("erreur de delete")
       return NextResponse.json({
        message:"erreeeur"
       })
    }
    

    
  }
  export async function PUT(request:Request) {
    try{
        const {searchParams}=new URL(request.url)
        const id=searchParams.get('id')
        const body=await request.json()
        if(!id){
          return NextResponse.json({message:"id n'est pas trouve"})
        }
        const collection=await connectDataBase()
        const result=await collection.updateOne({_id:new ObjectId(id)},{$set:body})
        return NextResponse.json(result)
    }catch(error){
      console.log("erreur lors de update",error)
      return NextResponse.json({message:"update failed"},{status:400})
    }
    
  }
  