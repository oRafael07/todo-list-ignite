import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import { Header } from './components/Header'
import { InputNewTask } from './components/InputNewTask'
import { Task } from './components/Task'
import uuid from 'react-uuid'


interface ITask {
  id: string
  description: string;
  isSelected: boolean
}

function App() {

  const [tasks, setTasks] = useState([] as ITask[])
  const [taskText, setTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()


    if (taskText === '') {
      return
    }

    setTasks([...tasks, { id: uuid(), description: taskText, isSelected: false }])
    setTaskText("")
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")

    setTaskText(event.target.value)
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeletedOne)
  }

  function handleSelectTask(event: ChangeEvent<HTMLInputElement>, id: string) {
    const TasksData = [...tasks]
    const taskIndex = TasksData.findIndex(i => i.id === id)
    const taskMark = TasksData.find(i => i.id === id)

    if (taskMark === undefined) return

    TasksData.splice(taskIndex, 1, {
      id: taskMark.id,
      description: taskMark.description,
      isSelected: !taskMark.isSelected
    })

    setTasks(TasksData)
  }

  return (
    <React.Fragment>
      <Header />
      <main className={styles.tasks}>
        <div className={styles.container}>
          <InputNewTask onChangeTaskText={handleNewTaskChange} onCreateNewTask={handleCreateNewTask} taskText={taskText} />
          <header>
            <div className={styles.info}>
              <p>Tarefas criadas</p>
              <span><p>{tasks.length}</p></span>
            </div>
            <div className={styles.info}>
              <p>Concluídas</p>
              <span><p>{tasks.length > 0 ? tasks.length : "0"} de {tasks.length > 0 ? tasks.filter(i => i.isSelected === true).length : "0"}</p></span>
            </div>
          </header>

          {tasks.map(row => (
            <Task key={row.id} description={row.description} isSelected={row.isSelected} id={row.id} onDeleteTask={handleDeleteTask} onSelectTask={handleSelectTask} />
          ))}
        </div>
      </main>
    </React.Fragment>
  )
}

export default App
