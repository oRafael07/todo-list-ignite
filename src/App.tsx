import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import { Header } from './components/Header'
import { InputNewTask } from './components/InputNewTask'
import { Task } from './components/Task'
import uuid from 'react-uuid'
import clipboardLogo from './assets/clipboard.svg'

interface ITask {
  id: string
  title: string;
  isCompleted: boolean
}

function App() {

  const [tasks, setTasks] = useState([] as ITask[])
  const [taskText, setTaskText] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (!taskText) return

    setTasks([...tasks, { id: uuid(), title: taskText, isCompleted: false }])
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

  function handleSelectTask(id: string) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return { ...task }
    })

    setTasks(newTasks)
  }

  const countTotalTask = tasks.length
  const countTaskCompleted = tasks.filter(task => task.isCompleted).length

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
              <span><p>{countTotalTask ? `${countTotalTask} de ${countTaskCompleted}` : '0'}</p></span>
            </div>
          </header>
          {countTotalTask === 0 && (
            <>
              <div className={styles.tasks_empty}>
                <img src={clipboardLogo} alt="" />
                <p><b>Você ainda não tem tarefas cadastradas</b><br />
                  Crie tarefas e organize seus itens a fazer</p>
              </div>
            </>
          )}

          {tasks.map(task => (
            <Task
              key={task.id}
              data={task}
              onDeleteTask={handleDeleteTask}
              onSelectTask={handleSelectTask}
            />
          ))}
        </div>
      </main>
    </React.Fragment>
  )
}

export default App
