"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa';


interface Client {

    email: string;
  
    password: string;
  
  }
const LoginForm = () => {
    const router = useRouter();


  const [formData, setFormData] = useState<Client>({

    email: '',

    password: '',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SignIn=async(e: React.FormEvent)=>{
    e.preventDefault()
    try {
        const response=await signIn('credentials',{
            email:formData.email,
            password:formData.password,
            redirect:false

        })
        if(response?.ok){
            router.push('/')
        }
    } catch (error) {
        console.error('login error:', error);
      alert('An error occurred while login in the account.');
        
    }
  
  }


  return (
    <div className="d-flex flex-column align-items-center justify-content-center  bg-light p-4">
      
  
      
          <form name="sentMessage" id="contactForm" onSubmit={SignIn}>
            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  required
                  data-validation-required-message="Please enter your email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  data-validation-required-message="Please enter password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>
            <div className="d-grid gap-3">
              <button className="btn btn-primary py-2 fw-bold" type="submit" id="loginButton">
                Login
              </button>
              <Link className="btn btn-outline-primary py-2" href="/register">
                Create Account
              </Link>
              <Link className="btn btn-outline-secondary py-2" href="/forget">
                Forget Password
              </Link>
            </div>
          </form>
      
      </div>
  )
}

export default LoginForm
