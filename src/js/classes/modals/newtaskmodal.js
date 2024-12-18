import "../../../css/newtaskmodal.css"
import { renderTask } from "../../functions/rendertasks";
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
        const dueDate = this.modal.querySelector('#new-task-duedate').value;
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

        if (project.value !== 0) {

        }

        const complete = false;

        const newTask = this.taskHandler.createTask(title, description, dueDate, priority, complete);
        this.taskHandler.addTask(newTask);

        if (project.value !== 0) {
            this.taskHandler.setProjectToTask(project, newTask);
        }

        renderTask(newTask, this.taskHandler);
        this.closeModal();

    }

}