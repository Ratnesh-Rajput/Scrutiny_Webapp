"use client"
import {  asyncotppasswordemploye } from '@/Store/Actions/employeaction'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const page = () => {
  const [email, setemail] = useState("")

  const [otp, setotp] = useState("")
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const { errors } = useSelector((state) => state.employeReducer)

  const dispatch = useDispatch();
  const router = useRouter();

  const ChangePasswordHandler = async (e) => {
    e.preventDefault();
     if (pwd === confirmPwd) {
      const newpwd = {
        email,
        otp,
        pwd
      }
      await dispatch(asyncotppasswordemploye(newpwd))
      if (errors.length <=6) {
        router.push("/employe/signin")
      }
      else {
        toast.error(JSON.stringify(errors))
        return;
      }
     }

  }
  // const sentotpHandler = async () => {
  //   const newpwd = {
  //     email,
  //     otp,
  //     pwd
  //   }
  //   await dispatch(asyncotppasswordemploye(newpwd))
  //   if (errors.length === 2) {
  //     router.push("/employe/signin")
  //   }
  //   else {
  //     toast.error(JSON.stringify(errors))
  //     return;
  //   }
  // }

  return (
    // <div className='container mt-5'>
    //    <form className='w-50'>
    //   <div className="mb-3">
    //     <label htmlFor="exampleInputEmail1" className="form-label">OTP</label>
    //     <input type="number" className="form-control" value={email} onChange={(e) => setemail(e.target.value)}/>
    //   </div>
    //   <div className="mb-3">
    //     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    //     <input type="password" className="form-control" id="exampleInputPassword1" value={pwd} onChange={(e) => setpwd(e.target.value)} />
    //   </div>
    // </form>

    //     <button onClick={sentotpHandler} className='btn btn-success'>Change Password</button>
    // </div>
    <div className='w-100 h-100 m-5'>
      <form className='w-100 d-flex flex-column align-items-center my-5' onSubmit={ChangePasswordHandler}>
      <input type="email" placeholder="email" name="email" id="email"
          value={email} onChange={(e) => setemail(e.target.value)} /><br />
        <input type="OTP" placeholder="OTP" name="OTP" id="OTP"
          value={otp} onChange={(e) => setotp(e.target.value)} /><br />
        <input type="password" placeholder="password" name="password" id="password"
          value={pwd} onChange={(e) => setPwd(e.target.value)} /><br />
        <input type="password" placeholder="confirm password" name="confirmpassword" id="confirmpassword"
          value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} /><br />
        <button type="submit">Change Password</button>
      </form>
      <center>Your OTP has been successfully Send to your email address. <br />Change your password within 5 mins.</center>
    </div>
  )

}

export default page