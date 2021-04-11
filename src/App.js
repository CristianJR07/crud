import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [EditMode, setEditMode] = useState(false)
  const [Id, setId] = useState("")
  const [error, setError] = useState(null)

  const ValidateForm = () => {
    let isValidate = true
    setError(null)
    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValidate = false    
    }
    return isValidate
  }

  const editTask = (thetask) => {
    setError("")
    setTask(thetask.name)
    setEditMode(true)
    setId(thetask.id)
  }
  const deleteTask = (id) => {
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }
  const addtask = (e) => {
    e.preventDefault()
    if(!ValidateForm()){
      return
    }
    const newTask = {
       id: shortid.generate(),
       name: task
    }
    setTasks([...tasks, newTask])
    setTask("")
  }

  const saveTask = (e) => {
    e.preventDefault()
    if(!ValidateForm()){
      return
    }
    const editAux = tasks.map(item => item.id == Id ? {Id, name: task} : item)
    setTasks(editAux)
    setEditMode(false)
    setTask("")
    setId("")
  }

  return (
    <div className="container mt-5">
        <h1>Tareas</h1>
        <hr/>
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista de tareas</h4>
            {
              size(tasks) == 0 ?(
                <li className="list-group-item">No hay tareas</li>
              ) :
              (
                  <ul className="list-group">
                  {  
                    tasks.map((task) => (         
                      <li className="list-group-item" key={task.id}>
                        <span className="lead">{task.name}</span>
                        <button 
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => deleteTask(task.id)}
                        >
                          Eliminar
                        </button>
                        <button 
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editTask(task)}
                        >Editar
                        </button>
                      </li>
                  ))   
                  }
                </ul>
              )
            }
          </div>
          <div className="col-4">
            <h4 className="text-center">{EditMode ? "Editar Tarea" : "Agregar tareas"}</h4>
            <form onSubmit={EditMode ? saveTask : addtask}>
              {
                error && <span className="text-danger">{error}</span>
              }
              <input type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea"
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />
              <button className={EditMode ?  "btn btn-warning btn-block" : "btn btn-dark btn-block"}
                type="submit">{EditMode ? "Guardar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
    </div> 
  );
}

export default App;
