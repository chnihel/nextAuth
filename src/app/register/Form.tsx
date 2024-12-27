"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';



    interface Client {
        fullName: string;
        email: string;
        confirmPassword: string,
        password: string;
      }
      export default function Form() {
        const router = useRouter();
      
        const [formData, setFormData] = useState<Client>({
          fullName: '',
          email: '',
          confirmPassword: '',
          password: '',
      
        });
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleSignUp = async (e: React.FormEvent): Promise<void> => {
          e.preventDefault();
          try {
      
            const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            if (response.ok) {
              const data = await response.json();
              
              alert('user added successfully!');
              console.log(data);
              router.push("/login");
      
      
            } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
            }
          } catch (err) {
            console.error('SignUp error:', err);
            alert('An error occurred while SignUp.');
          }
        };
  return (
    <div>
      <div>
      <form name="createAccountForm" id="createAccountForm" onSubmit={handleSignUp}>
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Full Name"
              required
              data-validation-required-message="Please enter your full name"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
            />
          </div>
        </div>
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
        <div className="form-group mb-3">
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
              data-validation-required-message="Please enter your password"
              name="password"
              onChange={handleChange}
              value={formData.password}
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
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              data-validation-required-message="Please confirm your password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>
        </div>
        <div className="d-grid gap-3">
          <button className="btn btn-primary py-2 fw-bold" type="submit" id="createAccountButton">
            Create Account
          </button>
          <Link className="btn btn-outline-primary py-2" href="/login">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
    </div>
  )
}


