const tasks = [];

// Contains all information and methods for each task
class Task{
    constructor(title, description, dueDate, priority, complete){
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.complete = complete;
    }

    updateTaskTitle(newTaskTitle){
        if(newTaskTitle){
            this.title = newTaskTitle;
        };
    }

    updateTaskDescription(newTaskDescription){
        if(newTaskDescription){
            this.description = newTaskDescription;
        };
    }

    updateTaskPriority(newTaskPriority){
        if(newTaskPriority){
            this.priority = newTaskPriority;
        };
    }

    toggleTaskComplete(){
        this.complete = !this.complete;
    }

    removeTask(){
        console.log('removeTask() accessed')
        const index = tasks.indexOf(this);
        
        if(index > -1){
            console.log('task found');
            tasks.splice(index, 1);
            console.log('task removed');
        };
    }
}

// Generates a new task, also used to regenerage saved tasks.
const createTask = (title, description, dueDate, priority, complete) => {
    const newTask = new Task(title, description, dueDate, priority, complete);
    tasks.push(newTask);
}

// Returns tasks array
const getAllTasks = () => {
    return tasks;
}

// Returns individual task from array.
const getTask = (task) => {
    return tasks[task];
}

// Clears the array, only used in localstorage.js to empty the array before loading saved data.
const clearTasks = () => {
    tasks.length = 0;
}

export{
    createTask,
    getAllTasks,
    getTask,
    clearTasks
}