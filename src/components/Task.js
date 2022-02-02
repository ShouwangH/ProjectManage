import React, {useState} from 'react';
import { updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import AssignTask from './AssignTask';

export default function Task(props) {
  const [proper, setProper] = useState()


  const getUserData = async (ref) => {
    const snap = await getDoc(ref)
    if (snap.exists()) {
      let name = ""
      name = snap.data().firstname.concat(" ",snap.data().lastname)
      setProper(name)

    }
  }

  
  const db = getFirestore()
  const docref = doc(db,"tasks", props.task.id)
  if (props.task.assignedto) {
  const userref = doc(db, "users", props.task.assignedto)
  getUserData(userref)
  }
  
  const completeTask = async () => {
    await updateDoc(docref, {
      completed: true
  })  






    }
    const removeTask = () => {}

  return (
    <div className="task">
      <div className='row align-items-start'>
      <div className='col'><button onClick={() => completeTask()}>Check</button></div>
        <div className='col-8'>{props.task.name}</div>
        <div className='col'>{proper||<AssignTask users={props.users} task={props.task}/>} </div>
        <div className='col'><button onClick={() => removeTask()}>x</button></div>
      </div>
    </div>
  );;
}
