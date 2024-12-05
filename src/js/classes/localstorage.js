import { getAllTasks, createTask, clearTasks } from "./tasks.js";

// Compare current tasks to saved tasks to determine if action should be taken.
const compareCurrentToLocal = () => {
    if(getAllTasks() && localStorage.getItem('saved-tasks')){
        if(JSON.stringify(getAllTasks()) === localStorage.getItem('saved-tasks')){
            console.log('Current tasks and saved tasks are the same.')
        }else{
            console.log('Current tasks and saved tasks differ.')
        }
    }else{
        console.log('Either no current tasks or no saved tasks')
    }
}

// Convert all existing tasks (if any) to JSON and save to local storage
const saveTasks = () => {
    if(getAllTasks()){
        const tasksJSON = JSON.stringify(getAllTasks());
        localStorage.setItem('saved-tasks', tasksJSON)
    }else{
        console.log('No tasks to save.');
    }
}

// Pull all saved tasks (if any) from JSON and regenerate Task objects.
const loadTasks = () => {
    if(localStorage.getItem('saved-tasks')){
        clearTasks();
        const loadedArray = JSON.parse(localStorage.getItem('saved-tasks'));
        for(const task in loadedArray){
            const thisTask = loadedArray[task];
            createTask(thisTask.title, thisTask.description, thisTask.dueDate, thisTask.priority, thisTask.complete);
        }
    }else{
        console.log('No tasks to load.');
    }
}

export{
    saveTasks,
    loadTasks,
    compareCurrentToLocal
}