import React, {useState, useContext} from 'react';
import { addDoc,getFirestore, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import { SelectedTaskContext, SelectedProjectContext } from '../../context';

export default function Header(props) {
  const [projectName, setProjectName] = useState()
  const [taskName, setTaskName] = useState()
  const {setSelectedTask} = useContext(SelectedTaskContext)
  const {setSelectedProject} = useContext(SelectedProjectContext)

  const submitProject = sp => {
    sp.preventDefault()
    if (!projectName) return
    const id = addPro(projectName)
    setSelectedProject({name:projectName,projectid:id})
  }

  const addPro = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db, "projects"), { name: item })
    await updateDoc(docref, {
      projectid:docref.id, 
      timestamp: serverTimestamp()
    })
    setProjectName("")
    return docref.id

  }

  const toggleLogin = () => {
    if (!props.displayLogin) {
    props.handleDisplay()
}}

  const toggleRegister = () => {
    if (props.displayLogin) {
    props.handleDisplay()
  }}
   
 
  
  const submitTask = st => {
    st.preventDefault()
    console.log(st)
    if (!taskName) return
    addTask(taskName)
    setSelectedTask("createdby")
    setTaskName("")
  }

  const addTask = async (item) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db,"tasks"), {name:item, createdby:props.currentUser.userId, completed:false})
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
          <div>
          <a className="navbar-brand" href="#">Shouwang's Productivity App</a>
          {props.currentUser && (
          <span className="dropdown">
            <button className="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              +
            </button>
            
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#addProjectModal" href="#">Add Project</a></li>
              <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#addTaskModal" href="#">Add Task</a></li>
            </ul>
            
          </span>
          ) }
          </div>
          <div className="navbar-text">
              {
                props.currentUser ? (
                  <>
                  <span className="nav-item"><span>Welcome, {`${props.currentUser.firstName} ${props.currentUser.lastName}`} </span></span>
                  <span className="nav-item" onClick={()=>{props.logOut()}}>Logout</span>
                  </>
                ) : (
                  <>
                  <span className="nav-item" onClick={()=>{toggleLogin()}}>Login </span>
                  <span className="nav-item" onClick={()=>{toggleRegister()}}>Register </span>
                  </>
                )
              }
            </div>
        </div>
      </nav>
    </div>

<div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModal" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="addProjectModal">Create Project</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <form id ="add-project-form" onSubmit={submitProject}>
  <input type="text" className = "input" value = {projectName} placeholder="What is the project name" onChange={sp => setProjectName(sp.target.value)}/>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitProject}>Create Project</button>
    </div>
  </div>
</div>
</div>

<div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="addTaskModal" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="addTaskModal">Create Task</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <form id ="add-task-form" onSubmit={submitTask}>
  <input type="text" className = "input" value = {taskName} placeholder= "Add Task" onChange={st => setTaskName(st.target.value)}/>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitTask}>Create Task</button>
    </div>
  </div>
</div>
</div>
</>
  )
}
