import React, { useEffect ,useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../config/Firebase'
export default function Home() {
    
    const [userEmail, setuserEmail] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setuserEmail(user.email)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });  }
        , []);

        
    return (
        <div className='py-5'>
            <div className="container">
                <div className="row ">
                    <div className="col-12 col-lg-6 m-auto">
                        <div className="card p-3 text-center">
                            <h2>Hello </h2>
                            <div>{userEmail ? <p>{userEmail}</p> : <p>Guest</p>}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
