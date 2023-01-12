import { ChangeEvent } from 'react';
import styles from './Task.module.css'
import { Trash } from 'phosphor-react'

interface ITaskProps {
  id: string;
  description: string,
  isSelected: boolean
  onDeleteTask: (id: string) => void;
  onSelectTask: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

export function Task({ description, isSelected, id, onDeleteTask, onSelectTask }: ITaskProps) {
  return (
    <div className={styles.task}>
      <input type="checkbox" className={styles.input_selectd} onChange={(event) => onSelectTask(event, id)} />
      <div className={isSelected ? styles.scratched : styles.content}>
        {description}
      </div>
      <button className={styles.deleteTask} data-remove={id} onClick={() => onDeleteTask(id)}>
        <Trash size={24} />
      </button>
    </div>
  )
}