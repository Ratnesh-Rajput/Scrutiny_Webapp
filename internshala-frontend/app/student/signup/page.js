"use client"
import { asynccurrentstudent, asyncsignupstudent } from '@/Store/Actions/studentaction';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");


  const dispatch = useDispatch();
  const router = useRouter();
    const {isAuthenticated} = useSelector((state) => state.studentReducer);
    useEffect(()=>{
      if(isAuthenticated) router.push("/student/auth")
    },[isAuthenticated]);  

  const signupHandler = (e) => {
    e.preventDefault();
    const newStudent = {
      firstname,
      lastname,
      contact,
      city,
      gender,
      email,
      password
    };
    dispatch(asyncsignupstudent(newStudent));
  }


  return (
    <>
      <div style={{ height: "90vh" }} className='w-100 d-flex align-items-center justify-content-center'>
      <h1>SignUp</h1>
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
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select id="gender" className="form-select" onChange={(e)=> setGender(e.target.value)} >
              <option value="Male" defaultValue="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
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