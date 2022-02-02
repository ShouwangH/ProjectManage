import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'

import {doc, getFirestore, updateDoc} from 'firebase/firestore'

export default function AssignTask(props) {
    
    const [assignee, setAssignee] = useState("")

    const assignTask = async (input) => {  
      const db = getFirestore()
      const docref = doc(db, "tasks", props.task.id)
      await updateDoc(docref, {
        assignedto:assignee
    })
      setAssignee(input[0].userid)
    }
        

  return (
      <Typeahead
      id="assign-to-user"
      onChange={(input)=>{assignTask(input)}}
      labelKey={option =>  `${option.firstname} ${option.lastname}`}
      options={props.users}
      placeholder="Please Assign Task"
      />

  )}
