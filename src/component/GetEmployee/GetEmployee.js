import React, { useState, useEffect } from 'react'
import { db } from '../../config/Firebase'
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore/lite";
import Swal from 'sweetalert2'

const initialUser = {
    name: '',
    email: '',
    city: ''
}
export default function GetEmployee() {

    // ===  ======= =   =   =   =   =   =   =
    const [state, setState] = useState(initialUser);



    // Handle Set State Use
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }


    // ===  =   =   =   =   


    const [userBase, setUserBase] = useState([]);

    // Get Userss Data
    const fetchDocuments = async () => {

        let array = []

        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {

            let data = doc.data()
            data.id = doc.id
            // console.log(data)
            array.push(data)
            // console.log(`${doc.id} => ${doc.data()}`);

        });

        setUserBase(array)


    }

    useEffect(() => {
        fetchDocuments()
    }, []);


    // Handle Delete
    const handleDelete = (person) => {


        console.log(person.id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "users", person.id));
                console.log("document deleted")

                // filtering Data To Show Again
                let newUserbase = userBase.filter((filterUser) => {
                    return person.id !== filterUser.id
                })
                setUserBase(newUserbase)
            }
        })
    }

    // end

    //              Handle Edit
    // const [personForEdit, setPersonForEdit] = useState({});

    const handleEdit = (person) => {
        setState(person)
        console.log(person)
    }

    const handleUpdate = async (person) => {

        if (!person.name && !person.email && !person.city) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Fields Is Empty',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        await setDoc(doc(db, "users", person.id), person);

        console.log("document updated")

        let newLogs = userBase.map((oldLogs) => {
            if (oldLogs.id === person.id) {
                return person
            } else {
                return oldLogs
            }
        })

        setUserBase(newLogs)

        setState({})

    }

    return (
        <div className='py-3'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-10 m-auto">
                        <div className='card py-3 px-2'>
                            <h2 className='text-center'>Employes</h2>
                            <br />
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">City</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {userBase.length > 0 ?
                                        userBase.map((person, i) => {
                                            return <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{person.name}</td>
                                                <td>{person.email}</td>
                                                <td>{person.city}</td>
                                                <td>
                                                    <button className='btn btn-danger me-2' onClick={() => { handleDelete(person) }}>Delete</button>
                                                    <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(person) }}>Edit</button>
                                                </td>

                                            </tr>
                                        })

                                        : <div className='spinner spinner-border'></div>

                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit {state.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Name" name='name' value={state.name} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Email" name='email' value={state.email} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="City" name='city' value={state.city} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(state) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
