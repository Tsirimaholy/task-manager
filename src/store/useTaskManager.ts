import {create} from "zustand";
import {Task} from "@/types/Task";

type Actions= {
    findTask: (title: string) => Task[];
    addTask: (task: Task) => void;
    // it will throw an error if the task was not found!
    updateTask: (taskId: Task['id'], task: Task) => void;
    deleteTask: (id: Task["id"])=>void;

}

type State = {
    tasks: Task[];
}

const useTaskManager = create<State & Actions>()((set, get) => ({
    tasks: [],
    findTask: (title) => {
        return get().tasks.filter(task => {
            return task.title.toLowerCase().includes(title)
        });
    },
    addTask: (task) => {
        console.log("adding task"+task.title)
        set(state => ({...state, tasks: [...state.tasks, task]}));
    },
    updateTask: (taskId, updatedTask) => {
        // find the task by id and return his index
        const foundTaskIndex = get().tasks.findIndex(currentTask => currentTask.id === taskId);
        if (foundTaskIndex!=-1) throw new Error("Task not found");
        // update task-list
        const updatedTaskCopy = get().tasks;
        updatedTaskCopy[foundTaskIndex] = {...updatedTask};
        set(state => ({...state, tasks: updatedTaskCopy}));
    },
    deleteTask: (id)=>set(state => ({...state, tasks: state.tasks.filter(task => task.id!=id)}))
}))

export {
    useTaskManager
}