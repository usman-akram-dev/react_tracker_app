import Task from './Task'

const Tasks = ({task , onDelete , onToggle}) => {
    
    return (
        <>
          {
              task.map((task)=> (
              <Task onDelete = {onDelete}  onToggle={onToggle}task={task} key={task.id}>/></Task>
              ))
          }
        </>
    )
}



export default Tasks
