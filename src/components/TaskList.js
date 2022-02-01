import {query, where, collection, onSnapshot, addDoc, getFirestore, updateDoc, serverTimestamp} from 'firebase/firestore'
import React, {useState, useEffect, useContext} from 'react';
import Task from './Task';
import Taskform from './Taskform';
import { SelectedProjectContext,SelectedTaskContext } from '../context';


export default function TaskList() {
  const [assignees, setAssignees] = useState([])
  const [tasks, setTasks] = useState([])

  const {selectedProject} = useContext(SelectedProjectContext)
  const {selectedTask} = useContext(SelectedTaskContext)


  useEffect( async () => {
    getTasks()
    getAssignees()
  }, [selectedProject, selectedTask])

  const getAssignees = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const queriedUser = [];
      querySnapshot.forEach((doc) => {
        queriedUser.push(doc.data());
      });
      
    if (unsubscribe) {
      setAssignees(queriedUser)
    }});

  }
  const getTasks = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'tasks'), 
    (selectedTask ? where(selectedTask, "==", "DTZ0aOCLQxv09MSuRqvH") : where('projectid', "==", selectedProject)))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const assignedtasks = [];
      querySnapshot.forEach((doc) => {
        assignedtasks.push(doc.data());
      });
      
    if (unsubscribe) {
      setTasks(assignedtasks)
    }});
  }
    


  const displayTasks = (arr) => {
    return arr.map((task) => (<Task task={task} key={task.id} users={assignees}/>))
  }

  const addTask = async (name) => {
    const db = getFirestore()
    const docref = await addDoc(collection(db,"tasks"), {name:name, createdby:"DTZ0aOCLQxv09MSuRqvH", completed:false})
    await updateDoc(docref, {
      id:docref.id, 
      timestamp: serverTimestamp()
    })
    const newTasks = [...tasks, {name:name, createdby:"DTZ0aOCLQxv09MSuRqvH"}]
    setTasks(newTasks)
  }




  return (
  <div className="task-list container">
      {displayTasks(tasks)}
      <Taskform addTask={addTask}/>

  </div>
  )
}
