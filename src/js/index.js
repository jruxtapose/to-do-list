import "../css/styles.css";
import TaskHandler from "./classes/tasks/taskhandler";
import NewTaskModal from "./classes/modals/newtaskmodal";
import NewProjectModal from "./classes/modals/newprojectmodal";
import filterTasks from "./functions/filtertasks";
import sortTasks from "./functions/sorttasks";
import { renderTasks } from "./functions/rendertasks";

const taskHandler = new TaskHandler();

const newTaskButton = document.querySelector('#add-task-button');
const newTaskModal = new NewTaskModal(newTaskButton, taskHandler);

const newProjectButton = document.querySelector('#add-project-button');
const newProjectModal = new NewProjectModal(newProjectButton, taskHandler);

const projectsListContainer = document.querySelector('.sidebar-projects-list')
const projectsList = taskHandler.getAllProjects();

const allTasksButton = document.querySelector('#show-all-tasks');
allTasksButton.addEventListener('click', () => {
    currentFilter = defaultFilter;
    currentSort = defaultSort;
    currentSortDirection = defaultSortDirection;
    currentProject = '';
    currentPriority = '';
    renderCurrentTasks();
})

const overDueTasksButton = document.querySelector('#show-overdue-tasks');
overDueTasksButton.addEventListener('click', () => {
    currentFilter = 'overdue'
    renderCurrentTasks();
})

if (projectsList){
    projectsList.forEach(project => {
        const projectDisplay = document.createElement('div');
        projectDisplay.className = 'project';
        
        const projectButton = document.createElement('button');
        projectButton.className = 'project-button';
        projectButton.textContent = `#${project}`;
        projectButton.addEventListener('click', () => {
            currentFilter = 'project';
            currentProject = project;
            renderCurrentTasks();
        })
        projectDisplay.appendChild(projectButton);

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.className = 'delete-project';
        deleteProjectButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>'
        deleteProjectButton.addEventListener('click', () => {
            if(confirm('Are you sure?')){
                taskHandler.removeProject(project, projectDisplay);
            }
        })
        projectDisplay.appendChild(deleteProjectButton);
        
        projectsListContainer.appendChild(projectDisplay);
    });
}

const defaultFilter = 'all';
const defaultSort = 'date';
const defaultSortDirection = 'asc';

let currentFilter = defaultFilter;
let currentSort = defaultSort;
let currentSortDirection = defaultSortDirection;
let currentProject;
let currentPriority;

function renderCurrentTasks(){
    const taskList = filterTasks(taskHandler, currentFilter, currentProject, currentPriority);
    sortTasks(taskList, currentSort, currentSortDirection);

    renderTasks(taskList, taskHandler);
}

renderCurrentTasks();