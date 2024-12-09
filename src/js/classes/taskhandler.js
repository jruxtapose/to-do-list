import { loadProjects, loadTasks, saveProjects, saveTasks } from "./localstorage";
import Task from "./task";

export default class TaskHandler{
    constructor(){
        // Check localStorage and load existing tasks/projects. Initialize array as empty if error is thrown due to data not existing.
        try {
            this.tasks = loadTasks().map(taskData => {
                const task = new Task(taskData._title, taskData._description, taskData._dueDate, taskData._priority, taskData._complete);
                console.log(task);
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
        task.setProject(project);
        saveTasks(this.tasks);
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

    removeProject(project){
        index = projects.indexOf(project);
        if(index > -1){
            this.projects.splice(index, 1);
            saveProjects(this.projects);
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