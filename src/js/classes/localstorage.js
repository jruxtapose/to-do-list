// Save tasks and projects to stringified JSON.

const saveTasks = (taskList) => {
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('saved-tasks', tasksJSON);
}

const saveProjects = (projectList) => {
    const projectsJSON = JSON.stringify(projectList);
    localStorage.setItem('saved-projects', projectsJSON);
}

// Pull all saved tasks & projects from JSON and parse.
const defaultJSON = '[{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T03:59:56.431Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:02:30.925Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:02:54.846Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:03:00.333Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:03:11.652Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:03:19.270Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:04:15.037Z","_priority":3,"_complete":false,"_project":null},{"_title":"Demo Task","_description":"This is a task for demonstration purposes","_dueDate":"2024-12-10T04:04:50.981Z","_priority":3,"_complete":false,"_project":null}]'

const loadTasks = () => {
    if(!localStorage.getItem('saved-tasks')){
        console.log('No tasks found in local storage. Default task loaded.');
        return JSON.parse(defaultJSON);
    }else{
        return JSON.parse(localStorage.getItem('saved-tasks'));
    }
}

const loadProjects = () => {
    if(!localStorage.getItem('saved-projects')){
        throw console.error('No projects found in local storage.');
    }else{
        return JSON.parse(localStorage.getItem('saved-projects'));
    }
}

export{
    saveTasks,
    saveProjects,
    loadTasks,
    loadProjects
}