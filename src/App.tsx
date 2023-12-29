import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { InputNewTask } from "./components/InputNewTask";
import { Task } from "./components/Task";
import uuid from "react-uuid";
import clipboardLogo from "./assets/clipboard.svg";
import { addTask, completeTask, deleteTask } from "./stores/slices/task";
import { useAppDispatch, useAppSelector } from "./stores";

function App() {
  const tasks = useAppSelector((state) => {
    return state.todo.tasks;
  });
  const [taskText, setTaskText] = useState("");
  const dispatch = useAppDispatch();

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (!taskText) return;
    dispatch(addTask({ id: uuid(), title: taskText, isCompleted: false }));
    setTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setTaskText(event.target.value);
  }

  function handleDeleteTask(id: string) {
    dispatch(
      deleteTask({
        id,
      })
    );
  }

  function handleSelectTask(id: string) {
    dispatch(
      completeTask({
        id,
      })
    );
  }

  const countTotalTask = tasks.length;
  const countTaskCompleted = tasks.filter((task) => task.isCompleted).length;

  return (
    <React.Fragment>
      <Header />
      <main className={styles.tasks}>
        <div className={styles.container}>
          <InputNewTask
            onChangeTaskText={handleNewTaskChange}
            onCreateNewTask={handleCreateNewTask}
            taskText={taskText}
          />
          <header>
            <div className={styles.info}>
              <p>Tarefas criadas</p>
              <span>
                <p>{tasks.length}</p>
              </span>
            </div>
            <div className={styles.info}>
              <p>Concluídas</p>
              <span>
                <p>
                  {countTotalTask
                    ? `${countTotalTask} de ${countTaskCompleted}`
                    : "0"}
                </p>
              </span>
            </div>
          </header>
          {countTotalTask === 0 && (
            <>
              <div className={styles.tasks_empty}>
                <img src={clipboardLogo} alt="" />
                <p>
                  <b>Você ainda não tem tarefas cadastradas</b>
                  <br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            </>
          )}

          {tasks.map((task) => (
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
  );
}

export default App;
