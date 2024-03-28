"use client"
import { asyncallinternships, asyncalljobs } from '@/Store/Actions/employeaction';
import { useRouter } from 'next/navigation'
import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const EmployeAuth = ({children}) => {
  const dispatch = useDispatch();
    const router = useRouter();
    const {isAuthenticated} = useSelector(state => state.employeReducer);    
    useEffect(() => {
      if(!isAuthenticated) router.push("/employe");
      if(isAuthenticated){
        dispatch(asyncalljobs());
        dispatch(asyncallinternships());
      }
    }, []);
    return children; 
}

export default EmployeAuth;