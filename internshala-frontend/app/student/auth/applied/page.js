"use client"
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
    const { student } = useSelector((state) => state.studentReducer);
    return (
        <div className='container mt-5'>
            <ul className='list-group'>
                <h3>
                    Applied jobs and Internships by <strong className=''>{student && student.firstname}</strong>
                </h3>
                <ul className='list-group'>
                    {student && student.jobs.map((j) => <div className='w-100 text-justify list-group-item mb-3 ' key={j._id}><p className='text-justify'>{JSON.stringify(j)}</p>
                    </div>)}

                    {student && student.internships.map((i) => <div className='w-100 text-justify list-group-item mb-3 ' key={i._id}><p className='text-justify'>{JSON.stringify(i)}</p>
                    </div>)}
                </ul>
        </ul >
    </div >
  )
}

export default page