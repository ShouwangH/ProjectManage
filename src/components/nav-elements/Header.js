import React, {useState, useContext} from 'react';
import { addDoc,getFirestore, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import { SelectedTaskContext, SelectedProjectContext } from '../../context';

export default function Header() {
  const [projectName, setProjectName] = useState()
  const [taskName, setTaskName] = useState()
  const {setSelectedTask} = useContext(SelectedTaskContext)
  const {setSelectedProject} = useContext(SelectedProjectContext)

  const submitProject = sp => {
    sp.preventDefault()
    if (!projectName) return
    addPro(projectName)
    setSelectedProject(projectName)
    setProjectName("")
  }

  const addPro = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db, "projects"), { name: item })
    await updateDoc(docref, {
      projectid:docref.id, 
      timestamp: serverTimestamp()
    })
  }
  
 
  
  const submitTask = st => {
    st.preventDefault()
    console.log(st)
    if (!taskName) return
    addTask(taskName)
    setSelectedTask(taskName)
    setTaskName("")
  }

  const addTask = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db,"tasks"), {name:item, createdby:"DTZ0aOCLQxv09MSuRqvH", completed:false})
    await updateDoc(docref, {
      id:docref.id, 
      timestamp: serverTimestamp()
    })
  }


  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <div className="dropdown">
            <button className="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              +
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#addProjectModal" href="#">Add Project</a></li>
              <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#addTaskModal" href="#">Add Task</a></li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>

<div className="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModal" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="addProjectModal">Create Project</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <form id ="add-task=form" onSubmit={submitProject}>
  <input type="text" className = "input" value = {projectName} onChange={sp => setProjectName(sp.target.value)}/>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary" data-dismiss="modal">Create Project</button>
    </div>
  </div>
</div>
</div>

<div className="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModal" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="addTaskModal">Create Task</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <form id ="add-task=form" onSubmit={submitTask}>
  <input type="text" className = "input" value = {taskName} onChange={st => setTaskName(st.target.value)}/>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary" data-dismiss="modal">Create Task</button>
    </div>
  </div>
</div>
</div>
</>
  )
}
