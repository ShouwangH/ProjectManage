import React, {useState} from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

export default function Login(props) {
  const [user, setUser] = useState(null)

  const toggleDisplay = () => {
    props.handleDisplay()
}

  const verifyCredentials = async (e) => {
    e.preventDefault()
    const db = getFirestore()
    const q = query(collection(db, 'users'), where("email", "==", e.target.email.value), where("password", "==", e.target.password.value))
    const querySnapshot = await getDocs(q)
    let temp = {}
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      temp = doc.data()
    })
    setUser(temp)
    console.log(user)
    if (user) {
    props.login(user)
  }
  }
      

  return (<div>
    <form onSubmit={(e)=>{verifyCredentials(e)}}>
      <div className="mb-3">
        <label htmlFor="inputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="inputEmail1" name="email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="inputPassword1" name="password"/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="rememberMe"/>
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
      </div>
      <button type="submit" className="btn btn-primary">Log In</button>
    </form>
    <div>Don't have an account?<a onClick={()=>{toggleDisplay()}}>Please Sign up Here</a></div>
  </div>);
}
