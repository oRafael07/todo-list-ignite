import { ChangeEvent } from 'react';
import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

interface ITaskProps {
  id: string;
  title: string,
  isCompleted: boolean
  onDeleteTask: (id: string) => void;
  onSelectTask: (id: string) => void;
}

export function Task({ id, title, isCompleted, onDeleteTask, onSelectTask }: ITaskProps) {
  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input type="checkbox" id={id} onChange={() => onSelectTask(id)} />
        <label htmlFor={id}></label>
      </div>
      {/* <input type="checkbox" className={styles.input_selectd} onChange={() => onSelectTask(id)} /> */}
      <div className={isCompleted ? styles.scratched : styles.content}>
        {title}
      </div>
      <button className={styles.deleteTask} data-remove={id} onClick={() => onDeleteTask(id)}>
        <Trash size={24} />
      </button>
    </div>
  )
}