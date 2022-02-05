import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom"
import Project from './views/Project';
import Sidebar from './components/nav-elements/Sidebar';
import Header from './components/nav-elements/Header';
import Register from './views/Register';
import Login from './views/Login';




export default function App() {

  let localUser = localStorage.getItem("user")
  if (!localUser) {
    localUser=null
  } else {
    localUser = JSON.parse(localUser)
  }
  

  const [currentUser, setCurrentUser] = useState(localUser ? localUser : null)
  const [displayRegister, setDisplayRegister] = useState(true)
  const [displayLogin, setDisplayLogin] = useState(false)

  


  const login = (user) => {
    let current = user
    setCurrentUser(current)
    localStorage.setItem('user',JSON.stringify(user))
  }

  const logOut = () => {
    setCurrentUser(null)
  }

  const handleDisplay = () => {
    setDisplayRegister(!displayRegister)
    setDisplayLogin(!displayLogin)
  }




  return (
    <div>
      <Header currentUser={currentUser} handleDisplay={handleDisplay}  displayLogin={displayLogin} logOut={logOut}/>
      <div className="container-fluid p-0 m-0">
        <div className="row justify-content-start gx-2">

          <Sidebar currentUser={currentUser} />
          <div className="col">
            <div className="p-3 bg-white align-self-stretch">
              {!currentUser
                ? <Project currentUser={currentUser}/>
                : <>
                  {displayRegister && <Register handleDisplay={handleDisplay} />}
                  {displayLogin && <Login handleDisplay={handleDisplay} login={login}/>}
                  </>}
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
