import TaskHandler from "./taskhandler";
import filterTasks from "./filtertasks";
import sortTasks from "./sorttasks";

const taskHandler = new TaskHandler();

const taskDetailTemplate = document.querySelector('#modify-task-modal-template');
const newTaskTemplate = document.querySelector('#new-task-modal-template');

taskDetailTemplate.remove();
newTaskTemplate.remove();

class Modal{
    constructor(template, triggerButton, modalType, task){
        this.template = template;
        this.triggerButton = triggerButton;
        this.modal = null;
        this.modalType = modalType;
        this.triggerButton.addEventListener('click', () => this.openModal());
        this.task = task;
    }

    openModal() {
        const mainWindow = document.querySelector('#content')
        this.triggerButton.disabled = true;
        this.modal = this.template.cloneNode(true);
        this.modal.id = this.modalType === 'new-task' ? 'new-task-modal' : 'modify-task-modal';
        mainWindow.appendChild(this.modal);

        const closeButton = this.modal.querySelector('#close-modal');
        const cancelButton = this.modal.querySelector('#cancel-modal')
        closeButton.addEventListener('click', () => this.closeModal());
        cancelButton.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        this.modal.remove();
        this.triggerButton.disabled = false;
        this.modal = null;
    }
}

const sidebarFunctionality = (() => {
    const addNewTaskButton = document.querySelector('#add-task-button');
    const newTaskModal = new Modal(newTaskTemplate, addNewTaskButton, 'new-task');
})();

const renderTasks = (taskList) => {
    const taskListContainer = document.querySelector('#task-list-table');
    taskListContainer.textContent = '';
    const generateTableHeaders = (() => {
        const headerRow = document.createElement('tr');

        const titleCell = document.createElement('th');
        titleCell.textContent = 'Title';
        
        const descriptionCell = document.createElement('th');
        descriptionCell.textContent = 'Description';
        
        const projectCell = document.createElement('th');
        projectCell.textContent = 'Project';
        
        const dueDateCell = document.createElement('th');
        dueDateCell.textContent = 'Due Date'
        
        const priorityCell = document.createElement('th');
        priorityCell.textContent = 'Priority';
        
        const completeCell = document.createElement('th');
        completeCell.textContent = 'Complete'
        
        const buttonCell = document.createElement('th');

        headerRow.append(titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, completeCell, buttonCell);
        taskListContainer.appendChild(headerRow);
    })();

    taskList.forEach((task) => {
        const taskRow = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = task.getTitle();

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = task.getDescription();

        const projectCell = document.createElement('td');
        projectCell.textContent = task.getProject();

        const dueDateCell = document.createElement('td');
        if(task.getDueDate()){
            dueDateCell.textContent = task.getDueDate();
        }

        const priorityCell = document.createElement('td');
        if(task.getPriority() === 1){
            priorityCell.textContent = 'Low';
        } else if (task.getPriority() === 2) {
            priorityCell.textContent = 'Medium';
        } else if (task.getPriority() === 3) {
            priorityCell.textContent = 'High';
        }

        const completeCell = document.createElement('td');
        if(task.getComplete()){
            completeCell.textContent = 'Complete';
        } else {
            completeCell.textContent = 'Incomplete';
        }

        const buttonCell = document.createElement('td');
        const modifyTaskButton = document.createElement('button');
        modifyTaskButton.className = 'modify-task';
        modifyTaskButton.textContent = 'Modify'

        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.className = 'delete-task';
        deleteTaskButton.textContent = 'Delete';
        deleteTaskButton.addEventListener('click', () => {
            if(confirm('Are you sure?')){
                taskHandler.removeTask(task);
                taskRow.remove();
            }
        });

        //const modifyTaskModal = new Modal(modifyTaskModal, modifyTaskButton, 'modify-task', task);

        buttonCell.append(modifyTaskButton, deleteTaskButton);

        taskRow.append(titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, completeCell, buttonCell);

        taskListContainer.appendChild(taskRow);
    })
}
const defaultList = filterTasks(taskHandler, 'all', null, 1);
const sortMethod = 'priority';
const sortDirection = 'dsc';
sortTasks(defaultList, sortMethod, sortDirection);

renderTasks(defaultList);