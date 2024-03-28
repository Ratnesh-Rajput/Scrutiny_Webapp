"use client"
import { asynccurrentstudent, asyncsigninstudent } from '@/Store/Actions/studentaction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("")

  const dispatch = useDispatch();
  const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.studentReducer);
    useEffect(()=>{
      if(isAuthenticated) router.push("/student/auth")
    },[isAuthenticated]);  

  const signinHandler = () => {
    alert("signin");
    const student = {
      email,
      password
    };
    dispatch(asyncsigninstudent(student));
  }

  return <div  className='container '>
    {/* <div className='row'> */}
    {/* <div className='col align-self-center'> */}
  <div className=' w-50 '>
  <h2>SignIn</h2>
  <hr className='w-50' />
    <form className='w-50' onSubmit={signinHandler}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit me-5" className="btn btn-primary">Sigin</button>
      <Link className='ms-5' href="/student/forget">Forget Password ?</Link>
      
    </form>
    </div>
    </div>
    // </div>
  // </div>
}

export default page