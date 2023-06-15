import React, {ChangeEvent, useRef, useState} from 'react';
import {Task} from "@/types/Task";
import {useTaskManager} from "@/store/useTaskManager";

const TaskManager = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const addInputRef = useRef<HTMLInputElement>(null);
    const {
        tasks,
        findTask: searchTask,
        addTask,
        updateTask,
        deleteTask,
    } = useTaskManager();

    const handleAddTask = (title?: string) => {
        const newTask = {
            id: Date.now().valueOf(),
            title: title || '',
            completed: false,
        };
        addTask(newTask);
    };

    const handleUpdateTask = (taskId: number, updatedTask: Task) => {
        updateTask(taskId, updatedTask);
    };

    const handleDeleteTask = (taskId: number) => {
        deleteTask(taskId);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // See! I already give you everything!
    const filteredTasks = searchTask(searchTerm);

    return (
        <div>
            <h1>Task Manager</h1>

            <input type="text" ref={addInputRef}/>

            <button onClick={()=>handleAddTask(addInputRef.current?.value)}>Add Task</button>

            <input type="text" onChange={handleSearch} placeholder="Search Task"/>
            <ul>
                {tasks.map(value => (<li key={value.id}>{value.title}</li>))}
            </ul>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) =>
                                handleUpdateTask(task.id, {...task, title: e.target.value})
                            }
                        />
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
