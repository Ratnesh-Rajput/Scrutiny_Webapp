"use client"
import { asyncapplyinternshipemploye, asyncapplyjobemploye } from '@/Store/Actions/employeaction';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const dispatch = useDispatch()
  const { employe } = useSelector(
    (state) => state.employeReducer);

  return <>

    <div className='container mt-2'>
      <h1>Welcome to Login </h1>
    </div>
  </>
}

export default page;