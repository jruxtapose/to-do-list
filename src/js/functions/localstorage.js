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
const defaultTasksJSON = '[{"_title":"Very late thing","_description":"I was due a WHILE ago.","_dueDate":"2024-09-10","_priority":3,"_complete":false,"_project":null,"domElement":{}},{"_title":"Do random thing","_description":"","_dueDate":"2024-12-06","_priority":2,"_complete":false,"_project":"Random Project","domElement":{}},{"_title":"Do small thing","_description":"","_dueDate":"2024-12-26","_priority":1,"_complete":false,"_project":"Small Project","domElement":{}},{"_title":"Do big thing","_description":"","_dueDate":"2024-12-31","_priority":3,"_complete":false,"_project":"Big Project","domElement":{}},{"_title":"No due date","_description":"I\'m due whenever.","_dueDate":"","_priority":1,"_complete":false,"_project":null,"domElement":{}},{"_title":"Complete Task","_description":"I\'m done. Yay.","_dueDate":"2024-12-31","_priority":3,"_complete":true,"_project":"Big Project","domElement":{}}]'

const loadTasks = () => {
    if(!localStorage.getItem('saved-tasks')){
        console.log('No tasks found in local storage. Default task loaded.');
        return JSON.parse(defaultTasksJSON);
    }else{
        return JSON.parse(localStorage.getItem('saved-tasks'));
    }
}

const defaultProjectsJSON = '["Big Project","Small Project","Random Project"]'

const loadProjects = () => {
    if(!localStorage.getItem('saved-projects')){
        console.log('No projects found in local storage. Loading default projects');
        return JSON.parse(defaultProjectsJSON);
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