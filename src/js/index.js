import "../css/styles.css";
import TaskHandler from "./classes/tasks/taskhandler";
import NewTaskModal from "./classes/modals/newtaskmodal";
import NewProjectModal from "./classes/modals/newprojectmodal";
import filterTasks from "./functions/filtertasks";
import sortTasks from "./functions/sorttasks";
import { renderTasks } from "./functions/rendertasks";
import { format } from "date-fns";

const taskHandler = new TaskHandler();
const today = new Date()
const todayDisplay = document.querySelector('#todays-date');
todayDisplay.textContent = format(today, 'eeee MMMM dd, yyyy');

const newTaskButton = document.querySelector('.add-new-task');
const newTaskModal = new NewTaskModal(newTaskButton, taskHandler);

const newProjectButton = document.querySelector('.add-new-project');
const newProjectModal = new NewProjectModal(newProjectButton, taskHandler);

const pageTitle = document.querySelector('.page-title')

const allTasksButton = document.querySelector('#show-all-tasks');
allTasksButton.addEventListener('click', () => {
    currentFilter = defaultFilter;
    pageTitle.textContent = 'All Tasks';
    renderCurrentTasks();
})
const highPriorityTasksButton = document.querySelector('#show-high-priority-tasks');
highPriorityTasksButton.addEventListener('click', () => {
    currentFilter = 'priority';
    currentPriority = 3;
    pageTitle.textContent = 'High Priority Tasks';
    renderCurrentTasks();
})
const overDueTasksButton = document.querySelector('#show-overdue-tasks');
overDueTasksButton.addEventListener('click', () => {
    currentFilter = 'overdue';
    pageTitle.textContent = 'Overdue Tasks';
    renderCurrentTasks();
})
const todayTasksButton = document.querySelector('#show-today-tasks');
todayTasksButton.addEventListener('click', () => {
    currentFilter = 'today';
    pageTitle.textContent = 'Today\'s Tasks';
    renderCurrentTasks();
})
const nextSevenDaysButton = document.querySelector('#show-next-seven-days-tasks');
nextSevenDaysButton.addEventListener('click', () => {
    currentFilter = 'nextSevenDays';
    pageTitle.textContent = 'Next Seven Day\'s Tasks';
    renderCurrentTasks();
})
const incompleteTasksButton = document.querySelector('#show-incomplete-tasks');
incompleteTasksButton.addEventListener('click', () => {
    currentFilter = 'complete';
    currentCompleteStatus = false;
    pageTitle.textContent = 'Incomplete Tasks';
    renderCurrentTasks();
})
const completeTasksButton = document.querySelector('#show-complete-tasks');
completeTasksButton.addEventListener('click', () => {
    currentFilter = 'complete';
    currentCompleteStatus = true;
    pageTitle.textContent = 'Complete Tasks';
    renderCurrentTasks();
})
const sortByDateButton = document.querySelector('#sort-by-date');
sortByDateButton.addEventListener('click', () => {
    currentSort = 'date';
    currentSortDirection = currentSortDirection === 'asc' ? 'dsc' : 'asc';
    renderCurrentTasks();
})
const sortByPriorityButton = document.querySelector('#sort-by-priority');
sortByPriorityButton.addEventListener('click', () => {
    currentSort = 'priority';
    currentSortDirection = currentSortDirection === 'asc' ? 'dsc' : 'asc';
    renderCurrentTasks();
})
const sortByProjectButton = document.querySelector('#sort-by-project');
sortByProjectButton.addEventListener('click', () => {
    currentSort = 'project';
    currentSortDirection = currentSortDirection === 'asc' ? 'dsc' : 'asc';
    renderCurrentTasks();
})

const renderProject = () => {
    const projectsList = taskHandler.getAllProjects();
    const projectsListContainer = document.querySelector('.project-buttons');
    projectsListContainer.textContent = '';
    

    if (projectsList.length > 0) {
        
        projectsList.forEach(project => {
            const deleteIcon = document.createElement('img');
            deleteIcon.src = '../images/svg/delete.svg';
            deleteIcon.alt = 'Delete';
            console.log(deleteIcon);
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'project-button-container';

            const projectButton = document.createElement('button');
            projectButton.className = 'project-button';
            projectButton.textContent = `#${project}`;
            projectButton.addEventListener('click', () => {
                currentFilter = 'project';
                currentProject = project;
                renderCurrentTasks();
            })
            buttonContainer.appendChild(projectButton);
        

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.appendChild(deleteIcon);
            deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
            deleteButton.addEventListener('click', () => {
                if(confirm('Are you sure?')){
                    taskHandler.removeProject(project, buttonContainer);
                }
            }) 
            buttonContainer.appendChild(deleteButton);           

            projectsListContainer.appendChild(buttonContainer);
        })
    }
}

renderProject();

const defaultFilter = 'all';
const defaultSort = 'date';
const defaultSortDirection = 'asc';

let currentFilter = defaultFilter;
let currentSort = defaultSort;
let currentSortDirection = defaultSortDirection;
let currentProject;
let currentPriority;
let currentCompleteStatus;

function renderCurrentTasks() {
    const taskList = filterTasks(taskHandler, currentFilter, currentProject, currentPriority, currentCompleteStatus);
    sortTasks(taskList, currentSort, currentSortDirection);
    if (Array.isArray(taskList) && taskList.length > 0) {
        renderTasks(taskList, taskHandler);
    } else {
        const taskListContainer = document.querySelector('.main');
        taskListContainer.textContent = '';
        const noAvailableTasks = document.createElement('div');
        noAvailableTasks.className = 'no-available-tasks';
        noAvailableTasks.textContent = 'No available tasks.'
        taskListContainer.appendChild(noAvailableTasks);
    }
}

export {
    renderProject,
    renderCurrentTasks
}


renderCurrentTasks();