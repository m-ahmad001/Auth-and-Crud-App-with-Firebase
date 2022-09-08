import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, setDoc, } from "firebase/firestore/lite";
import { db } from '../../config/Firebase'
import Swal from 'sweetalert2'
import GetEmployee from '../../component/GetEmployee/GetEmployee';



const initialUser = {
    name: '',
    email: '',
    city: ''
}
export default function AddEmployee() {

    const [state, setState] = useState(initialUser);



    // Handle Set State Use
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }


    //    Handle Submit Form Data
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(state)

        const { name, email, city } = state
        if (!name && !email && !city) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Empty Fields',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        try {
            const docRef = await addDoc(collection(db, "users"), { name, email, city });
            console.log("Document written with ID: ", docRef.id);
            setState(initialUser)
            
        } catch (e) {
            console.error("Error adding document: ", e);
            console.log("Error adding document: ", e);
        }

        
            
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Employee Added SuccessFully',
            showConfirmButton: false,
            timer: 1500
        })

        

    }






    return (
        <div className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className="card p-5">
                            <div className="row">
                                <div className="col">
                                    <h3 className='text-center'>Add Employee</h3>
                                    <form onSubmit={handleSubmit}>

                                        <input className='form-control' value={state.name} type="text" name="name" placeholder='Enter Your Name' onChange={handleChange} />
                                        <input className='my-2 form-control' value={state.email} type="email" name="email" placeholder='Enter Your Email' onChange={handleChange} />
                                        <input className=' form-control' value={state.city} type="text" name="city" placeholder='Enter Your City' onChange={handleChange} />
                                        <button className='my-2 btn btn-primary' >Add Employee</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<GetEmployee/>




        </div>
    )
}
