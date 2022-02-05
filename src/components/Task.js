import React, { useEffect, useState} from 'react';
import { updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import AssignTask from './AssignTask';
import { Draggable } from 'react-beautiful-dnd';

export default function Task(props) {
  const [proper, setProper] = useState()
  const [completed, setCompleted] = useState(props.task.completed)
  const [name, setName] = useState(props.task.name)

 


  const getUserData = async (ref) => {
    const db = getFirestore()
    const snap = await getDoc(ref)
    if (snap.exists()) {
      let name = ""
      name = snap.data().firstName.concat(" ",snap.data().lastName)
      setProper(name)

    }
  }

  
  const toggleCompleteTask = async () => {
    setCompleted(!completed)
    const db = getFirestore()
    const docref = doc(db,"tasks", props.task.id)
    await updateDoc(docref, {
      completed:!completed
    })

  }  

  const submit = e => {
    e.preventDefault()
    editTask(name)
  }

  const editTask = async (name) => {
    const db = getFirestore()
    const docref = doc(db,"tasks", props.task.id)
    await updateDoc(docref, {
      name:name
    })

  }  

  const removeTask = () => {}

  if (props.task.assignedto) {
    const db = getFirestore()
    const userref = doc(db, "users", props.task.assignedto)
    getUserData(userref)
  }

  return (
      <div className='container-fluid'>
        <div className="row">
      <div className='col-1 py-2'><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => toggleCompleteTask()} checked={completed}/></div>
      <div className='col-xl-8 py-2'>{props.task.name}</div>
        <div className='col-2'>{proper || <AssignTask users={props.users} task={props.task} currentUser={props.currentUser}/>} </div>
        <div className='col-1 py-2 '><button onClick={() => removeTask()}>x</button></div>
      </div>
      </div>
  );
}
