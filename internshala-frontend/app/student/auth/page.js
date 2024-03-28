"use client"
import { asyncapplyinternshipstudent, asyncapplyjobstudent } from '@/Store/Actions/studentaction';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const dispatch = useDispatch()
  const { jobs, internships, student } = useSelector(
    (state) => state.studentReducer);

  const ApplyJobHandler = (id) => {
    dispatch(asyncapplyjobstudent(id))
  }
  const  ApplyinternshipHandler = (id) => {
    dispatch(asyncapplyinternshipstudent(id))
  }

  
  return <>

    <div className='container mt-2'>
      <h1>Dashboard</h1>
      <h3>
        Available jobs for <strong className=''>{student && student.firstname}</strong>
      </h3>
      <ul className='list-group'>
        {jobs && jobs.map((j) => <div className='w-100 text-justify list-group-item mb-3 ' key={j._id}><p className='text-justify'>{JSON.stringify(j)}</p>
          <br />
          {!j.students.includes(student && student._id) ? <button onClick={() => ApplyJobHandler(j._id)}

            className='btn btn-primary'>Apply job</button> : <h2 style={{ color: 'green' }}>Applied!!</h2>}
          <br />
        </div>)}
      </ul>
      <hr/>

      <h3>
        Available internships for <strong className=''>{student && student.firstname}</strong>
      </h3>
      <ul className='list-group'>
        {internships && internships.map((i) => <div className='w-100 text-justify list-group-item mb-3 ' key={i._id}><p className='text-justify'>{JSON.stringify(i)}</p>
          <br />
          {!i.students.includes(student &&  student._id) ? <button onClick={() => ApplyinternshipHandler(i._id)}

            className='btn btn-primary'>Apply internship</button> : <h2 style={{ color: 'green' }}>Applied!!</h2>}
          <br />
        </div>)}
      </ul>
    </div>
  </>
}

export default page;