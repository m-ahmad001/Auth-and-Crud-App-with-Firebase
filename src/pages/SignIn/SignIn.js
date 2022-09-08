import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/Firebase";


const startingUser = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [signUser, setSignUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setSignUser(user);
        console.log("user is sign in");
        // ...
      } else {
        // User is signed out
        // ...console.log('user is sign out')
        console.log("user is sign out");
      }
    });
  }, []);
  const [state, setState] = useState(startingUser);

  // const [email, setEmail] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [password, setPassword] = useState();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    console.log(state.email);
    console.log(state.password);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("Form Work");

    const { email, password } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('User not found')
      });
  };
// logoutttt
  const handleLogout = () => {signOut(auth)
.then(()=>{
    console.log('logout Okay')
    setSignUser({})
})
.catch(()=>{
    console.log('error during logout')
})
}
  
  return (
    <div className="py-5 ">
      <div className="container">
        <div className="row ">
          <div className="col-12 col-lg-6 col-md-9 mx-auto">
            {signUser.email ? (<div className="row text-center">
                <h2>User Is Active {signUser.email}</h2>
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  
                  SignOut
                </button>
              </div>) : (
              <div className="card p-5">
                <div className="row text-center">
                  <h2>Sign In {signUser.email}</h2>
                </div>
                <div className="row">
                  <div className="col">
                    <form onSubmit={handlerSubmit} onChange={handleChange}>
                      <input
                        type="email"
                        className="form-control mb-1"
                        name="email"
                        placeholder="Enter Your Email"
                      />
                      <input
                        type="password"
                        className="form-control mb-1"
                        name="password"
                        placeholder="Enter Your Password"
                      />

                      <div className="row m-auto">
                        <button
                          type="submit"
                          className="btn btn-outline-danger"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
