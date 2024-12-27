import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import LoginForm from './Form'
import { FaLock } from 'react-icons/fa'
import LoginAction from '../components/loginAction'

const Login = async() => {
    const session=await getServerSession(authOptions)
        if(session){
            return redirect('/')
        }
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center  bg-light p-4">
      <h1 className="text-danger fw-bold mb-4 text-center">
        <FaLock className="me-2" />
        You are not logged in
      </h1>
      <div
        className="bg-white p-5 rounded shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="section-title px-3 fw-bold">
            <span className="px-2">Login To Your Account</span>
          </h2>
        </div>
        <LoginForm />
      </div>
      <div className="mt-4">
        <LoginAction/>
      </div>
    </div>
    </>
  )
}

export default Login
