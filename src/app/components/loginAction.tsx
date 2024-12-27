'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const LoginAction = () => {
  return (
    <div className="flex space-x-5">
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
              </div>
  )
}

export default LoginAction
