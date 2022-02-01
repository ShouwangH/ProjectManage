import React, {useState} from 'react';

export default function Taskform(props) {
    const [name, setName] = useState([]);


    const submit = e => {
      e.preventDefault()
      if (!name) return
      props.addTask(name)
      setName("")
    }

    return (
      <form id ="add-task=form" onSubmit={submit}>
        <input type="text" className = "input" value = {name} onChange={e => setName(e.target.value)}/>
      </form>
    )
    }

