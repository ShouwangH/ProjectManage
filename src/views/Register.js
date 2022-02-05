import React, {useEffect, useState} from 'react';
import { getFirestore, addDoc, collection, updateDoc } from 'firebase/firestore';

export default function Register(props) {
    const [registered, setRegistered] = useState(false)
    
    const toggleDisplay = () => {
        props.handleDisplay()
    }

    const registerUser = async (e) => {
        e.preventDefault()
        if (e.target.inputPassword.value == e.target.confirmPassword.value) {
        const db = getFirestore()
        const docref = await addDoc(collection(db,"users"), 
            {firstName:e.target.inputFirst.value, 
            lastName:e.target.inputLast.value, 
            email:e.target.inputEmail.value,
            password:e.target.inputPassword.value
    })

        await updateDoc(docref, {
            userId:docref.id 
      })

      toggleDisplay()
    }}



    return (
        <div className="container">
            <form onSubmit={(e) => { registerUser(e) }}>
                <div className="mb-1">
                    <label htmlFor="inputFirst" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="inputFirst" name="inputFirst" aria-describedby="emailHelp" />
                </div>
                <div className="mb-1">
                    <label htmlFor="inputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="inputLast" name="inputLast" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="inputEmail1" name="inputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" name="inputPassword"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputConfirm" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="inputConfirm" name="confirmPassword"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <div>Already have a account <a onClick={()=>{toggleDisplay()}}> Login</a></div>
            </form>
        </div>
    );
};

