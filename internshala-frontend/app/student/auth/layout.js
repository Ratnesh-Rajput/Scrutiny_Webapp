"use client"
import { asyncallinternships, asyncalljobs } from '@/Store/Actions/studentaction';
import { useRouter } from 'next/navigation'
import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const StudentAuth = ({children}) => {
  const dispatch = useDispatch();
    const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.studentReducer);    
    useEffect(() => {
      if(!isAuthenticated) router.push("/student");
      if(isAuthenticated){
        dispatch(asyncalljobs());
        dispatch(asyncallinternships());
      }
    }, []);
    return children; 
}

export default StudentAuth;