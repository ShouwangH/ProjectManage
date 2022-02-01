import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import Project from './views/Project';
import Sidebar from './components/nav-elements/Sidebar';
import Header from './components/nav-elements/Header';




export default function App() {




  return (
    <div>
      <Header/>
      <div className="container p-0 m-0">
  <div className="row justify-content-start gx-2">
    <div className="col-3">
     <div className="p-3 bg-light">
     <Sidebar/>
     </div>
    </div>
    <div className="col-9">
      <div className="p-3 bg-light align-self-stretch">
      <Routes>
        <Route path = "/" element={<Home />}/>
        <Route path = "/project" element={<Project />}/>
      </Routes>
      </div>
    </div>
  </div>
</div>
      
      
      </div>
  )
}
