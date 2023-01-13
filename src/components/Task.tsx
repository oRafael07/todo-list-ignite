import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

interface Task {
  id: string;
  title: string,
  isCompleted: boolean
}

interface ITaskProps {
  data: Task;
  onDeleteTask: (id: string) => void;
  onSelectTask: (id: string) => void;
}

export function Task({ data, onDeleteTask, onSelectTask }: ITaskProps) {
  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input type="checkbox" id={data.id} onChange={() => onSelectTask(data.id)} />
        <label htmlFor={data.id}></label>
      </div>

      <div className={data.isCompleted ? styles.scratched : styles.content}>
        {data.title}
      </div>
      <button className={styles.deleteTask} onClick={() => onDeleteTask(data.id)}>
        <Trash size={24} />
      </button>
    </div>
  )
}