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


const loadTasks = () => {
    if(!localStorage.getItem('saved-tasks')){
        throw console.error('No tasks found in local storage.');
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