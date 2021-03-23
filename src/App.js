import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState ,useEffect} from 'react'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router , Route} from 'react-router-dom'
function App() {
  const [showAddTask , setShowAddTask] = useState(false)
  const [task , setTasks] = useState( [])

useEffect(()=>{
  const getTask = async()=>{
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

  getTask()
  
} , [])

//fetch task
const fetchTasks = async () =>{
  const res = await fetch('http://localhost:5000/task')
  const data = await res.json()

  return data
}
   //Add a  task 
     
    // const addTask = (tasks)=>{
        
    //   const id = Math.floor(Math.random()*10000) + 1
    //   const newTask = {id, ...tasks}
    //   setTasks([...task , newTask])
    //   }


    const addTask = async (tasks)=>{

      const res = await fetch('http://localhost:5000/task' ,{
        method : 'POST' ,
        headers: {
          'Content-type' : 'application/json'
        } , 
        body : JSON.stringify(tasks)
      })

       const data = await res.json()
       setTasks([...task , data])
    }
  
    // //Delete task
    // const DeleteTask = (id)=>{

    //   setTasks(task.filter((task)=>task.id!==id))

    // }

    //Delete task
    const DeleteTask = async (id)=>{

      await fetch(`http://localhost:5000/task/${id}` ,{
        method : 'DELETE'
      })

      setTasks(task.filter((task)=>task.id!==id))

    }
    const fetchTask = async(id) =>{
      const res = await fetch(`http://localhost:5000/task/${id}`)
      const data = await res.json()
    
      return data
    }
    //Toggle reminder
    const ToggleReminder = async (id) =>{
 
       const  tasktoToggle = await fetchTask(id);
       const  updateTask    = {...tasktoToggle , reminder : !tasktoToggle.reminder}
       
       const res = await fetch(`http://localhost:5000/task/${id}`,
       {
         method : 'PUT' , 
         headers : {
           'Content-type' : 'application/json'
           
         },
         body : JSON.stringify(updateTask),
       })

       const data = await res.json()

       setTasks(task.map((task)=> task.id==id ? {...task , reminder :
      data.reminder} : task
      ))
    }



    
  return (
    <Router>
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      
      <Route exact path='/' render={(props)=>
      <>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {task.length > 0 ? <Tasks onDelete={DeleteTask } onToggle={ToggleReminder} task={task}/> : 'No task to display'}
      </>
      }></Route>
      <Route path='/about' component={About}/>
      <Footer />
    
    </div>
    </Router>
  );
}

export default App;
