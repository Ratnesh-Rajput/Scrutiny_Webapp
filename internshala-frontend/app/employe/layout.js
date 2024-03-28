"use client"
import { asynccurrentemploye, asyncsignoutemploye } from '@/Store/Actions/employeaction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const employeLayout = ({children}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.employeReducer);
    // console.log(isAuthenticated);
    useEffect(()=>{
      dispatch(asynccurrentemploye());
      if(isAuthenticated) router.push("/employe/auth")
    },[isAuthenticated]);  

const signoutHandler = () => {
  dispatch(asyncsignoutemploye())
}

  return <>
<div className='mt-3 w-100 container text-center'>
    <div className='  w-100 shadow-sm p-2 mb-5 bg-body-tertiary rounded '>
    <nav className='d-flex align-items-center justify-content-between bg-light  p-3 text-dark'>
      <div className="logo ">Logo</div>
      <div className="links ">
      <Link href= { isAuthenticated ? "/employe/auth" : "/employe"} className='text-decoration-none text-dark '>Home</Link>
        {
           isAuthenticated ?(
            <>
            <Link href="/employe/auth/profile" className='text-decoration-none text-dark ms-5 me-5'>Profile</Link>
            <Link href="/employe/auth/applied" className='text-decoration-none text-dark ms-5 me-5'>My application</Link>

            <Link onClick={signoutHandler} href="/employe" className='text-decoration-none text-dark'>SignOut</Link>
            </>
          ):(
            <>
            <Link href="/employe/signin" className='ms-5 me-5 text-decoration-none text-dark me-5'>SignIn</Link>
            <Link href="/employe/signup" className='me-5 text-decoration-none text-dark'>SignUp</Link>
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

export default employeLayout;