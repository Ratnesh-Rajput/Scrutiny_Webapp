"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { asynccurrentstudent } from '@/Store/Actions/studentaction'

// export const metadata = {
//   title: 'Homepage',
// }

const page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentstudent());
  },[]);
  return (
    <>

    <div className='mt-3 w-100 container text-center'>
    <div className='  w-100 shadow-sm p-2 mb-5 bg-body-tertiary rounded '>
    <div class="row">
    <div class="col-6"><Link href="/student" >
       Student
    </Link ></div>
    <div class="col-6"><Link className='' href="/employe" >
      Employe
    </Link ></div>
  </div>
</div>
    </div>

   
    </>
  )
}

export default page ;