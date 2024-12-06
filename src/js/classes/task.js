
// Contains all information and methods for each task
export default class Task{
    constructor(title, description, dueDate, priority, complete){
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.complete = complete;
        this.project = null;
    }

    // Get/Set each property

    getTaskTitle(){
        return this.title;
    }

    setTaskTitle(newTitle){
        this.title = newTitle;
    }

    getTaskDescription(){
        return this.description;
    }

    setTaskDescription(newDescription){
        this.description = newDescription;
    }

    getDueDate(){
        return this.dueDate;
    }

    setDueDate(newDueDate){
        this.dueDate = newDueDate;
    }

    getPriority(){
        return this.priority;
    }

    setPriority(newPriority){
        this.priority = newPriority;
    }

    getComplete(){
        return this.complete;
    }

    toggleComplete(){
        this.complete = !this.complete;
    }

    getProject(){
        return this.project;
    }

    setProject(newProject){
        this.project = newProject;
    }

    removeProject(){
        this.project = null;
    }

}