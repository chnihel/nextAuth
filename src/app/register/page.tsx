import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Form from './Form'

const SignUp = async() => {

    const session=await getServerSession(authOptions)
    if(session){
        return redirect('/')
    }
  return (
    <div>
       <div className="d-flex flex-column align-items-center justify-content-center vh-100  bg-light p-4">
      <div className="bg-white p-5 rounded shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <h2 className="section-title px-5 fw-bold">
            <span className="px-2">Create Your Account</span>
          </h2>
        </div>
        <Form />
      </div>
    </div>
    </div>
  )
}

export default SignUp
