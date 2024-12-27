import clientPromise from "@/lib/mondobd";
import { NextResponse } from "next/server";

async function connectDataBase() {
    const client=await clientPromise
    const db=client.db('nextdata')
  const collection1=db.collection("users")
  return collection1
}
export async function POST(request:Request) {
    const body=await request.json();
    console.log("nouvelle commande",body);
    const bcrypt=require('bcryptjs')
    const { fullName, password, email } = body;
      // Validation de base
  if (!fullName || !password || !email) {
    return NextResponse.json(
      { message: "Tous les champs sont requis" },
      { status: 400 }
    );
  }
    try {
        const collection=await connectDataBase()
        const existingUser=await collection.findOne({email})
        if(existingUser){
          return NextResponse.json(
            {message:'user deja existe'},
          {status:400})
        }
         const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)  

        const addUser=await collection.insertOne({fullName,password:hashedPassword,email, createdAt:new Date()})
        return NextResponse.json(
          {message:'user creer avec succees',data:addUser},
          {status:201}
        )


    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return NextResponse.json(
        { message: "Erreur interne du serveur" },
        { status: 500 }
      ); 
    }
}