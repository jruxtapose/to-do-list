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

const renderTasks = ((taskList) => {
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

        taskListContainer.appendChild(listItem);
    });
});

const defaultList = filterTasks(taskHandler, 'all', null, null);

renderTasks(defaultList);
