"use client"
import { asyncavatarstudent, asyncresetpasswordstudent, asyncupdatestudent } from '@/Store/Actions/studentaction';
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentReducer);
  const url = student?.avatar?.url;
  console.log(url);
  const StudentUpdateHandler = (e) => {
    e.preventDefault();
    const newStudent = {
      firstname,
      lastname,
      contact,
      city,
      gender,
      avatar,
    };
    dispatch(asyncupdatestudent(newStudent));
  }

  const AvatarHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    formData.set("avatar", e.target.avatar.files[0]);
    dispatch(asyncavatarstudent(formData));
  }

  const ResetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(asyncresetpasswordstudent(resetPassword))
  }


  return (
    <div className='container mt-3'>
      <img height={200} src={url} alt="image" />
      <form onSubmit={AvatarHandler} encType="multipart/form-data">
        <input type='file' name='avatar' />
        <button type='submit'>Submit</button>
      </form><br />
      <form className='w-100 p-2' onSubmit={StudentUpdateHandler}>
        <div className="d-flex">
          <div className="mb-3 w-50">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className="mb-3 ms-5 w-50">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input type="tel" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select id="gender" className="form-select" onChange={(e) => setGender(e.target.value)} >
            <option value="Male" defaultValue="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-5">Update Student </button>
      </form>
      <form onSubmit={ResetPasswordHandler}>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label"></label>
          <input type="text" className="form-control" id="pwd" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
        </div>
        <button className='btn btn-danger ml-5' >RESET PASSWORD</button>
      </form>
    </div>
  )
}

export default page