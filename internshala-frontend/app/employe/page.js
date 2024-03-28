"use client"
import { asynccurrentemploye } from '@/Store/Actions/employeaction';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.employeReducer);
    console.log(isAuthenticated);
    useEffect(()=>{
      dispatch(asynccurrentemploye());
      if(isAuthenticated) router.push("/employe/auth")
    },[isAuthenticated]);  

  return (
    <><div className='container mt-5'>
    <Link className ="btn btn-primary me-5" href="/employe/signin"> Signin </Link>
    <Link className ="btn btn-success ms-5" href="/employe/signup"> Signup </Link>
    </div>

    </>
  )
}

export default page