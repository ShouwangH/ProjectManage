import React, { useRef } from 'react';
import Tasklist from '../components/TaskList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Project(props) {


  const onDragEnd= result =>{
    // const { destination, source, draggableId} = result
    
    // if (!destination) {
    //   return;
    // }

    // if (
    //   destination.droppableId === source.droppableID &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }

    // const newTaskIds = Array.from()


  }
    
  return (
  
      
            <main className="container-fluid">
              <Tasklist currentUser={props.currentUser}/>
            </main>
    
  );
}
