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
const defaultTasksJSON = '[{"_title":"Default Task","_description":"Hello! \\n\\nYou may change or delete this task by clicking the modify icon in the lower right hand corner. \\n\\nTo add new projects, press the plus icon next to \'Projects\' to the left, and you may delete empty projects by clicking the trash icon next to them. \\n\\nTo add a new task, press the \'Add New Task\' button at the bottom of the sidebar.","_priority":3,"_complete":false,"_project":"Default Project","_createdOn":"2025-01-07T18:45:24.828Z"}]';

const loadTasks = () => {
    if(!localStorage.getItem('saved-tasks')){
        console.log('No tasks found in local storage. Default task loaded.');
        return JSON.parse(defaultTasksJSON);
    }else{
        return JSON.parse(localStorage.getItem('saved-tasks'));
    }
}

const defaultProjectsJSON = '["Default Project"]'

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