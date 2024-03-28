"use client"
import { asynccurrentstudent, asyncsignoutstudent } from '@/Store/Actions/studentaction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const StudentLayout = ({children}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.studentReducer);
    // console.log(isAuthenticated);
    useEffect(()=>{
      dispatch(asynccurrentstudent());
      if(isAuthenticated) router.push("/student/auth")
    },[isAuthenticated]);  

const signoutHandler = () => {
  dispatch(asyncsignoutstudent())
}

  return <>
<div className='mt-3 w-100 container text-center'>
    <div className='  w-100 shadow-sm p-2 mb-5 bg-body-tertiary rounded '>
    <nav className='d-flex align-items-center justify-content-between bg-light  p-3 text-dark'>
      <div className="logo ">Logo</div>
      <div className="links ">
      <Link href= { isAuthenticated ? "/student/auth" : "/student"} className='text-decoration-none text-dark '>Home</Link>
        {
           isAuthenticated ?(
            <>
            <Link href="/student/auth/profile" className='text-decoration-none text-dark ms-5 me-5'>Profile</Link>
            <Link href="/student/auth/applied" className='text-decoration-none text-dark ms-5 me-5'>My application</Link>

            <Link onClick={signoutHandler} href="/student" className='text-decoration-none text-dark'>SignOut</Link>
            </>
          ):(
            <>
            <Link href="/student/signin" className='ms-5 me-5 text-decoration-none text-dark me-5'>SignIn</Link>
            <Link href="/student/signup" className='me-5 text-decoration-none text-dark'>SignUp</Link>
            </>
          )}
      </div>
      <div className="avatar">Avatar</div>
    </nav>
    </div>
    </div>

    {children}
  </>
}

export default StudentLayout;