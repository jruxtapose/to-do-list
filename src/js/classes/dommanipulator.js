import TaskHandler from "./taskhandler";
import filterTasks from "./filtertasks";
import sortTasks from "./sorttasks";

const taskHandler = new TaskHandler();

const taskDetailTemplate = document.querySelector('#modify-task-modal-template');
const newTaskTemplate = document.querySelector('#new-task-modal-template');

taskDetailTemplate.remove();
newTaskTemplate.remove();

class Modal{
    constructor(template, triggerButtonID, modalType){
        this.template = template;
        this.triggerButton = document.querySelector(triggerButtonID);
        this.modal = null;
        this.modalType = modalType;
        this.triggerButton.addEventListener('click', () => this.openModal());
    }
    
    handleEscape(event){
        if(event.key === 'Escape') {
            this.closeModal();
        }
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
    const newTaskModal = new Modal(newTaskTemplate, '#add-task-button', 'new-task');
})();

const newRenderTasks = (taskList) => {
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
        priorityCell.textContent = 'Cell';
        
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
        buttonCell.append(modifyTaskButton, deleteTaskButton);

        taskRow.append(titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, completeCell, buttonCell);

        taskListContainer.appendChild(taskRow);
    })
}

const renderTasks = (taskList) => {
    const taskListContainer = document.querySelector('#task-list');
    taskListContainer.textContent = '';
    console.log(taskList);
    taskList.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'task'

        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title'
        taskTitle.textContent = task.getTitle();
        listItem.appendChild(taskTitle);

        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.textContent = task.getDescription();
        listItem.appendChild(taskDescription);

        const taskPriority = document.createElement('div');
        taskPriority.className = 'task-priority';
        if(task.getPriority() === 1){
            taskPriority.textContent = 'Low';
            taskPriority.classList.add('low-priority');
        }else if(task.getPriority() === 2){
            taskPriority.textContent = 'Medium';
            taskPriority.classList.add('medium-priority');
        }else if(task.getPriority() === 3){
            taskPriority.textContent = 'High'
            taskPriority.classList.add('high-priority');
        };
        listItem.appendChild(taskPriority);

        const taskComplete = document.createElement('div');
        taskComplete.className = 'task-complete';
        if(task.getComplete()){
            taskComplete.textContent = 'Complete';
        }else{
            taskComplete.textContent = 'Incomplete';
        };
        listItem.appendChild(taskComplete);

        if(task.getProject()){
            const taskProject = document.createElement('div');
            taskProject.className = 'task-project';
            taskProject.textContent = task.getProject();
            listItem.appendChild(taskProject);
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-buttons'

        const editButton = document.createElement('button');
        editButton.className = 'edit-task-button';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-task-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if(confirm('Are you sure?')){
                taskHandler.removeTask(task);
                listItem.remove();
            }
        })
        listItem.appendChild(deleteButton);

        taskListContainer.appendChild(listItem);
    });
};

newRenderTasks((filterTasks(taskHandler, 'all', null, 3)));