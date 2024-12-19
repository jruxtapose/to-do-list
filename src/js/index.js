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
const todayDisplay = document.querySelector('#today-date');
todayDisplay.textContent = format(today, 'eeee MMMM dd, yyyy');

const newTaskButton = document.querySelector('#add-task-button');
const newTaskModal = new NewTaskModal(newTaskButton, taskHandler);

const newProjectButton = document.querySelector('#add-project-button');
const newProjectModal = new NewProjectModal(newProjectButton, taskHandler);

const allTasksButton = document.querySelector('#show-all-tasks');
allTasksButton.addEventListener('click', () => {
    currentFilter = defaultFilter;
    renderCurrentTasks();
})

const highPriorityTasksButton = document.querySelector('#show-high-priority-tasks');
highPriorityTasksButton.addEventListener('click', () => {
    currentFilter = 'priority';
    currentPriority = 3;
    renderCurrentTasks();
})

const overDueTasksButton = document.querySelector('#show-overdue-tasks');
overDueTasksButton.addEventListener('click', () => {
    currentFilter = 'overdue'
    renderCurrentTasks();
})

const todayTasksButton = document.querySelector('#show-today-tasks');
todayTasksButton.addEventListener('click', () => {
    currentFilter = 'today';
    renderCurrentTasks();
})

const nextSevenDaysButton = document.querySelector('#show-next-seven-days-tasks');
nextSevenDaysButton.addEventListener('click', () => {
    currentFilter = 'nextSevenDays';
    renderCurrentTasks();
})

const incompleteTasksButton = document.querySelector('#show-incomplete-tasks');
incompleteTasksButton.addEventListener('click', () => {
    currentFilter = 'complete';
    currentCompleteStatus = false;
    renderCurrentTasks();
})

const completeTasksButton = document.querySelector('#show-complete-tasks');
completeTasksButton.addEventListener('click', () => {
    currentFilter = 'complete';
    currentCompleteStatus = true;
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
    const projectsListContainer = document.querySelector('.sidebar-projects-list');

    if (projectsList.length > 0) {
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
            });
            projectDisplay.appendChild(deleteProjectButton);
        
            projectsListContainer.appendChild(projectDisplay);
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
        const taskListContainer = document.querySelector('#task-list-table');
        taskListContainer.textContent = 'No available tasks.';
    }
}

export {
    renderProject,
    renderCurrentTasks
}


renderCurrentTasks();