"use client"
import { asynccurrentemploye, asyncsignupemploye } from '@/Store/Actions/employeaction';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [organisationName, setogName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");


  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthenticated} = useSelector((state) => state.employeReducer);

  useEffect(()=>{
    if(isAuthenticated) router.push("/employe/auth")
  },[isAuthenticated]);  


    
    const signupHandler = (e) => {
      e.preventDefault();
      const newEmploye = {
        firstname,
        lastname,
        contact,
        organisationName,
        email,
        password
      };
      dispatch(asyncsignupemploye(newEmploye));
    }
    

  return (
    <>
      <div style={{ height: "90vh" }} className='w-100 d-flex align-items-center justify-content-center'>
        <form onSubmit={signupHandler} className='w-50'>
          <div className="d-flex">
            <div className="mb-3 w-50">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}  />
            </div>
            <div className="mb-3 ms-5 w-50">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="organisationName" className="form-label">Organisation Name</label>
            <input type="text" className="form-control" id="organisationName" value={organisationName} onChange={(e) => setogName(e.target.value)} />
          </div>
          <div className="mb-3">
           
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">SignUp</button>
        </form>
      </div>
    </>
  )
}

export default page