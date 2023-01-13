import { ChangeEvent, FormEvent } from 'react'
import styles from './InputNewTask.module.css'
import { PlusCircle } from 'phosphor-react'

interface IProps {
  taskText: string
  onCreateNewTask: (event: FormEvent) => void;
  onChangeTaskText: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputNewTask({ taskText, onCreateNewTask, onChangeTaskText }: IProps) {

  return (
    <div className={styles.container}>
      <form onSubmit={onCreateNewTask}>
        <input type="text" placeholder='Adicione uma nova tarefa' onChange={onChangeTaskText} value={taskText} />
        <button type="submit" disabled={taskText ? false : true}>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>
    </div>
  )
}