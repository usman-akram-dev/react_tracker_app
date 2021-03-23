
import {useState} from 'react' ;


const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert('Please add a task')
            return 
        }

        onAdd({text , day , reminder})
        setText('')
        setDay('')
        setReminder('')
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className='form-control'>
            <label For="task" >Task</label>
            <input id='task' value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Add Task"></input>
            </div>
            <div className='form-control'>
            <label For="day&time" >Day & Time</label>
            <input id='day&time' value={day} onChange={(e)=>setDay(e.target.value)} type="text" placeholder="Add Day & Time"></input>
            </div>
            <div className='form-control form-control-check'>
            <label For="setreminder" >Set Reminder</label>
            <input id='setreminder' checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} type="checkbox"></input>
            </div>
            <input type='submit' className="btn btn-block" value='Save Task'></input>
        </form>
    )
}

export default AddTask
