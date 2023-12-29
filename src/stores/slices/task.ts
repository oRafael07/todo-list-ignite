import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

const initialState: { tasks: Task[] } = {
  tasks: [],
};

export const todosSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title } = action.payload;

      state.tasks.push({
        id: uuid(),
        title,
        isCompleted: false,
      });
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    completeTask: (state, action) => {
      const { id } = action.payload;

      state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }

        return { ...task };
      });
    },
  },
});

export const { addTask, completeTask, deleteTask } = todosSlice.actions;

export default todosSlice.reducer;
