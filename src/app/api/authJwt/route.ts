/* import clientPromise from "@/lib/mondobd";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

async function connectDataBase() {
    const client=await clientPromise
    const db=client.db('nextdata')
  const collection1=db.collection("users")
  return collection1
}

export async function POST(request: Request) {
    const body = await request.json(); // Extraction du body
    const { email, password } = body;
  
    // Vérification des champs
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe sont requis pour la connexion" },
        { status: 400 }
      );
    }
  
    const collection = await connectDataBase();
  
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
  
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email }, 
        secretKey, 
        { expiresIn: "7d" } 
    );
  
    const sessionData = { id: user._id, role: user.role, email: user.email };
  
    const cookie = serialize("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // Une semaine
      path: "/",
    });
  
    return NextResponse.json(
      { message: "Connexion réussie", data: sessionData },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  }
   */