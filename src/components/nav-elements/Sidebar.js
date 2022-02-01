import React, {useState, useContext} from 'react'; 
import Projects from '../Projects';
import AddProject from '../AddProject';
import { SelectedTaskContext, SelectedProjectContext } from '../../context';

export default function Sidebar() {
    const [display, setDisplay] = useState(true)
    const {setSelectedTask} = useContext(SelectedTaskContext)
    const {setSelectedProject} = useContext(SelectedProjectContext)

    const  displayProjects= () => {
        setDisplay(!display)
    }

  return (
    <ul className="nav flex-column">
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" onClick={()=>{
                setSelectedTask('createdby')
                setSelectedProject("")
            }}>Tasks I've Created</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" onClick={()=>{
                setSelectedTask('assignedby')
                setSelectedProject("")
            }}>Tasks I've Assigned</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" onClick={()=>{
                setSelectedTask('assignedto')
                setSelectedProject("")
            }}>Tasks Assigned To Me</a>
        </li>
        <li className="nav-item" id="show/hide project" onClick={()=> displayProjects()}>
            <a className="nav-link" role="button" href="#">Projects</a>
        </li>
        <ul>{display && <Projects/>}</ul>
        <AddProject/>   

    </ul>
    )
}
