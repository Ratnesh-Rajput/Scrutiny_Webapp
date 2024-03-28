"use client"
import { asyncforgetpasswordemploye } from '@/Store/Actions/employeaction'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const page = () => {
    const [email, setemail] = useState("")
    console.log(email)

    const dispatch = useDispatch();
    const router = useRouter();
    
    const { errors } = useSelector((state) => state.employeReducer)

    const sendEmailHandler = async (e) => {
        e.preventDefault()
        // console.log(e.target[0].value);
        // setemail(e.target[0].value);
        // console.log('email gya',email)
        await dispatch(asyncforgetpasswordemploye(email))
        if (errors.length <=6 ){
            router.push("/employe/forget/otp")
          }
        else {
            toast.error(JSON.stringify(errors))
            return;
        }
    }
    return (
        <div className='container mt-5'>
            <form className="p-5 m-5 w-50" onSubmit={sendEmailHandler}>
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email} onChange={(e) => setemail(e.target.value)} />
                <button className='btn btn-primary mt-2'>Send Mail</button>
            </form>
        </div>
    )
}

export default page