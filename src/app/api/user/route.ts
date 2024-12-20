import clientPromise from "@/lib/mondobd";
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
    const { username, password, role, email, address } = body;
      // Validation de base
  if (!username || !password || !role || !email) {
    return NextResponse.json(
      { message: "Tous les champs sont requis" },
      { status: 400 }
    );
  }
    try {
        const collection=await connectDataBase()

    } catch (error) {
        
    }
}