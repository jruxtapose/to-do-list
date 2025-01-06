import { renderTask } from "../../functions/rendertasks";
import { renderCurrentTasks } from "../..";
const newTaskTemplate = document.querySelector('#new-task-modal-template');
newTaskTemplate.remove();

export default class NewTaskModal{
    constructor(triggerButton, taskHandler){
        this.triggerButton = triggerButton,
        this.template = newTaskTemplate,
        this.modal = null;
        this.taskHandler = taskHandler;
        this.triggerButton.addEventListener('click', () => this.openModal());
    };

    openModal() {
        this.triggerButton.disabled = true;
        this.modal = this.template.cloneNode(true);
        this.modal.id = 'new-task-modal';
        document.body.appendChild(this.modal);

        const projectsSelect = this.modal.querySelector('#new-task-project');
        const projects = this.taskHandler.getAllProjects();

        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            projectsSelect.appendChild(option);
        })

        const closeButton = this.modal.querySelector('.close-modal');
        const cancelButton = this.modal.querySelector('.cancel-modal');
        const addTaskForm = this.modal.querySelector('#new-task-form');
        addTaskForm.addEventListener('submit', (e) => this.addTask(e))

        closeButton.addEventListener('click', () => this.closeModal());
        cancelButton.addEventListener('click', () => this.closeModal());
    }

    closeModal(){
        this.modal.remove();
        this.triggerButton.disabled = false;
        this.modal = null;
    }

    addTask(event){
        event.preventDefault();

        const title = this.modal.querySelector('#new-task-title').value;
        const description = this.modal.querySelector('#new-task-description').value;

        // Trick to force date to match picker.

        const dueDateInput = this.modal.querySelector('#new-task-duedate').value;
        let dueDate;
        if (dueDateInput) {
            const [year, month, day] = dueDateInput.split('-').map(Number);
            dueDate = new Date(year, month -1, day, 23, 59, 59, 999);
        }

        const project = this.modal.querySelector('#new-task-project').value;
        //Get selected priority
        let priority;
        if(this.modal.querySelector('#new-task-low-priority').checked){
            priority = 1;
        } else if (this.modal.querySelector('#new-task-medium-priority').checked) {
            priority = 2;
        } else if (this.modal.querySelector('#new-task-high-priority').checked) {
            priority = 3;
        }

        const complete = false;

        const newTask = this.taskHandler.createTask(title, description, dueDate, priority, complete);
        this.taskHandler.addTask(newTask);

        if (project.value !== '0') {
            this.taskHandler.setProjectToTask(project, newTask);
        }

        renderCurrentTasks();
        
        this.closeModal();

    }

}