import { loadProjects, loadTasks, saveProjects, saveTasks } from "../../functions/localstorage";
import Task from "./task";

function debounce(func, delay){
    let timeOutID;
    return function(){
        clearTimeout(timeOutID);
        timeOutID = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

export default class TaskHandler{
    constructor(){
        // Check localStorage and load existing tasks/projects. Initialize array as empty if error is thrown due to data not existing.
        try {
            this.tasks = loadTasks().map(taskData => {
                const task = new Task(taskData._title, taskData._description, taskData._dueDate, taskData._priority, taskData._complete);
                task._createdOn = taskData._createdOn;
                task.setProject(taskData._project);
                return task;
            });
        } catch (error) {
            this.tasks = []
        }

        try {
            this.projects = loadProjects();
        } catch (error){
            this.projects = [];
        }
    }

    // Update task properties and save;
    updateTaskProperty(task, property, newValue){
        switch(property){
            case 'title':
                task.setTitle(newValue);
                break;
            case 'description':
                task.setDescription(newValue);
                break;
            case 'dueDate':
                task.setDueDate(newValue);
                break;
            case 'priority':
                task.setPriority(newValue);
                break;
            case 'complete':
                task.toggleComplete();
                break;
            case 'project':
                if(newValue !== '0'){
                    task.setProject(newValue);
                } else if (newValue === '0') {
                    task.removeProject();
                }
        }
        const debouncedSave = debounce(saveTasks, 300);
        debouncedSave(this.tasks);
    }

    // Create/Push a new task or remove a task(after checking that it exists in the array);
    createTask(title, description, dueDate, priority, complete){
        return new Task(title, description, dueDate, priority, complete);
    }
    
    addTask(task){
        this.tasks.push(task);
        saveTasks(this.tasks);
    }

    removeTask(task){
        const index = this.tasks.indexOf(task);
        if(index > -1){
            this.tasks.splice(index, 1);
            saveTasks(this.tasks);
        };
    }

    // Set or un-set a project for a task

    setProjectToTask(project, task){
        if (project !== '0') {
            task.setProject(project);
            saveTasks(this.tasks);
        }
    }

    removeProjectFromTask(project, task){
        if(task.getProject() === project){
            task.removeProject();
            saveTasks(this.tasks);
        }
    }

    // Add/remove a project

    addNewProject(project){
        this.projects.push(project);
        saveProjects(this.projects)
    }

    removeProject(project, container){
        let assignedToTasks = false;
        this.tasks.forEach(task => {
            if (task.getProject() === project){
                assignedToTasks = true;
            }
        });
        const index = this.projects.indexOf(project);
        if(index > -1){
            let assignedToTasks = false;
            this.tasks.forEach(task => {
                if (task.getProject() === project){
                    assignedToTasks = true;
                }
            });

            if (assignedToTasks) {
                alert('Project currently has tasks.')
            } else {
                this.projects.splice(index, 1);
                if (container) {
                    container.remove();
                }
                saveProjects(this.projects);
            }
        }
    }

    // Get all tasks/projects

    getAllTasks(){
        return this.tasks;
    }

    getAllProjects(){
        return this.projects;
    }

    // Get specific task or project

    getTask(task){
        return this.tasks[task];
    }

    getProject(project){
        return this.projects[project];
    }

    // Get count of complete/incomplete tasks

    getCompleteTaskCount(){
        return this.tasks.filter((task) => task.getComplete()).length;
    }

    getIncompleteTaskCount(){
        return this.tasks.filter((task) => !task.getComplete()).length;
    }

}