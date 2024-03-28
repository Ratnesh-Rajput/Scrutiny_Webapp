"use client"
import { asynccurrentstudent } from '@/Store/Actions/studentaction';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// export const metadata = {
//       title: 'Student | Homepage',
//     }

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.studentReducer);
    console.log(isAuthenticated);
    useEffect(()=>{
      dispatch(asynccurrentstudent());
      if(isAuthenticated) router.push("/student/auth")
    },[isAuthenticated]);  

  return (
    <><div className='container mt-5'>
    <Link className ="btn btn-primary me-5" href="/student/signin"> Signin </Link>
    <Link className ="btn btn-success ms-5" href="/student/signup"> Signup </Link>
    </div>

    </>
  )
}

export default page