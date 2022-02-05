import React, {useState, useContext} from 'react'; 
import Projects from '../Projects';
import AddProject from '../AddProject';
import { SelectedTaskContext, SelectedProjectContext } from '../../context';

export default function Sidebar(props) {
    const [display, setDisplay] = useState(true)
    const {setSelectedTask} = useContext(SelectedTaskContext)
    const {selectedProject, setSelectedProject} = useContext(SelectedProjectContext)

    const  displayProjects= () => {
        setDisplay(!display)
    }


  return (
    <div className="col-3">
    <div className="p-3 bg-light vh-100" >
      <aside className='bd-sidebar' id="sidebar">
    <ul className="nav flex-column">
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" onClick={()=>{
                setSelectedTask('createdby')
                setSelectedProject('')
            }}>Tasks I've Created</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" onClick={()=>{
                setSelectedTask('assignedby')
                setSelectedProject('')
            }}>Tasks I've Assigned</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" onClick={()=>{
                setSelectedTask('assignedto')
                setSelectedProject('')
            }}>Tasks Assigned To Me</a>
        </li>
        <div className="position-absolute top-50 start-10">
        <li className="nav-item" id="show/hide project" onClick={()=> displayProjects()}>
            <h4 className="nav-link" role="button" href="#">Projects</h4>
        </li>
        <ul>{display && props.currentUser && <Projects/>}</ul>
        {props.currentUser&& <AddProject/>} 
        </div>  
        </ul>
    </aside>
    </div>
    </div>
    )
}
