import React from 'react';
import { updateDoc, doc, getFirestore } from 'firebase/firestore';
import AssignTask from './AssignTask';

export default function Task(props) {

    const completeTask = async () => {
      const db = getFirestore()
      const docref = doc(db,"tasks", props.task.id)
      console.log(docref)
      await updateDoc(docref, {
        completed: true
    })



    }
    const removeTask = () => {}
    const assignTask = () => {}

  return (
    <div className="task">
      <div className='row align-items-start'>
      <div className='col'><button onClick={() => completeTask()}>Check</button></div>
        <div className='col-8'>{props.task.name}</div>
        <div className='col'><AssignTask users={props.users}/></div>
        <div className='col'><button onClick={() => removeTask()}>x</button></div>
      </div>
    </div>
  );;
}
