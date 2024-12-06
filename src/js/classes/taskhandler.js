export default class TaskHandler{
    constructor(){
        this.tasks = [];
        this.projects = [];
    }

    // Push a new task or remove a task(after checking that it exists in the array);
    addNewTask(task){
        this.tasks.push(task);
    }

    removeTask(task){
        index = this.tasks.indexOf(task);
        if(index > -1){
            this.tasks.splice(index, 1);
        };
    }

    // Set or un-set a project for a task

    setProjectToTask(project, task){
        task.setProject(project);
    }

    removeProjectFromTask(project, task){
        if(task.getProject() === project){
            task.removeProject();
        }
    }

    // Add/remove a project

    addNewProject(project){
        this.projects.push(projects);
    }

    removeProject(project){
        index = projects.indexOf(project);
        if(index > -1){
            this.projects.splice(index, 1);
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