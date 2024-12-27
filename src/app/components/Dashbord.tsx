"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Dashbord = ({ session }: { session: any }) => {
  return (
    <div>
      {session ?(
        <>
        <img src={session.user?.image as string} className="rounded-full h-20 w-20" alt="" />
        <h1 className="text-3xl text-green-500 font-bold">Welcome back,{session.user?.name} </h1>
        <p className="text-2xl font-semibold">{session.user?.email}</p>
          <button
            onClick={() => signOut({callbackUrl:'/login'})}
            className="border border-black rounded-lg bg-red-400 px-5 py-1"
          >
            Sign Out
          </button>
          <Link
        href="/commande/create"
        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
      >
        Add new commande
      </Link>
      <Link
        href="/commande/liste"
        className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
      >
        Show all commands
      </Link>
        </>
      ):(
        <>
        <h1>you are not logged in</h1>
        {/* <div className="flex space-x-5">
            <button
              onClick={() => signIn("google")}
              className="border border-black rounded-lg px-5 py-1"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="border border-black rounded-lg bg-green-500 px-5 py-1"
            >
              Sign in with GitHub
            </button>
          </div> */}

        </>
      )}
    </div>
  )
}

export default Dashbord
