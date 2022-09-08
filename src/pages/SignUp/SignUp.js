import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword,onAuthStateChanged, } from "firebase/auth";
import { auth } from '../../config/Firebase';

const startingUser = {
    email:"",
    displayName:"",
    password:"",
}

export default function SignUp() {
    const [state, setState] = useState(startingUser);
    const [signedUser , setSignedUser]=useState({})
    
    //                  Handle Change Function

    // 
useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setSignedUser(user)
        console.log(uid)
        console.log('Auth Changed')
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
},[])
    // 

    const handleChange = e => {
        setState({...state,[e.target.name]:e.target.value})
    console.log('Employee Added')
    
      }

    //                                  Handle Submit User
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        console.log("Form Work");

        const {email , displayName ,password} = state

        createUserWithEmailAndPassword(auth, email, password,displayName)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
        
      }
      
    return (
        <div className='py-5 '>
            <div className="container">
                <div className="row ">
                    <div className="col-12 col-lg-6 col-md-9 mx-auto">
                        <div className="card p-5">
                            {signedUser.id ? <>
                                <div className="row">
                                <h2>Register YourSelf</h2></div>
                            <div className="row">
                                <div className="col">
                                    <form  onSubmit={handlerSubmit}>
                                        <input type="email" className='form-control mb-1' name='email' placeholder='Enter Your Email' onChange={handleChange} />
                                        <input type="text" className='form-control mb-1' name='displayName' placeholder='Enter Your Name' onChange={handleChange} />
                                        <input type="password" className='form-control mb-1' name='password' placeholder='Enter Your Password' onChange={handleChange} />
                                        
                                        <div className="row m-auto"><button type="submit" className='btn btn-outline-danger' >Submit</button></div>
                                    </form>
                                </div>
                            </div>
                            </>
                            : <h2>Hello {signedUser.email}</h2>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
