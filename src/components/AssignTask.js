import React, { useEffect, useState } from 'react';

export default function AssignTask(props) {
    
    const [assignee, setAssignee] = useState('')

    const autocomplete = (e) => {
        console.log(e.target.value)
        let proper = [];
        props.users.forEach(name => {
            proper.push(name.firstname.concat(" ",name.lastname))
        })
        return (
        <div id="assign-autocomplete-list" className="autocomplete-items">
            {proper.map(person => {if (person.substr(0,e.target.value.length).toUpperCase() === e.target.value.toUpperCase()) {
                <div onClick={setAssignee(person)}>
                    <strong>{person.substr(0,e.target.value.length)}</strong>{person.substr(e.target.value.length)}
                    <input type ="hidden" value ={person}/>
                </div>
            }

            })} 
        </div>
        )
    }


    


  return (
      <div>
          <form onSubmit={autocomplete}>
              <div className="autocomplete">
                  <input id="assignto" type="text" name="assignto" placeholder="Assignee" value = {assignee} onChange={ e =>autocomplete()}/>
              </div>
          </form>
      </div>

  );
}
