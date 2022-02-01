import React, { useState } from 'react';
import { getFirestore, addDoc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function AddProject() {
  const [name, setName] = useState()


  const submit = e => {
    e.preventDefault()
    if (!name) return
    addProject(name)
    setName("")
  }

  const addProject = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db, "projects"), { name: item })
    await updateDoc(docref, {
      projectid:docref.id, 
      timestamp: serverTimestamp()
    })
  }
  

  return ( 
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal"> Add Project </button>

    <div className="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModal">Create Project</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form id ="add-task=form" onSubmit={submit}>
        <input type="text" className = "input" value = {name} onChange={e => setName(e.target.value)}/>
      </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Create Project</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
