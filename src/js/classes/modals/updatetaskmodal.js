import "../../../css/updatetaskmodal.css"
import { format } from "date-fns";
import { renderCurrentTasks } from "../..";
const updateTaskModalTemplate = document.querySelector('#modify-task-modal-template');
updateTaskModalTemplate.remove();

export default class UpdateTaskModal{
    constructor(task, triggerButton, taskHandler){
        this.triggerButton = triggerButton;
        this.template = updateTaskModalTemplate;
        this.modal = null;
        this.taskHandler = taskHandler;
        this.task = task;

        
        this.triggerButton.addEventListener('click', () => this.openModal());
    };

    openModal() {
        this.modal = this.template.cloneNode(true);
        this.modal.id = 'modify-task-modal';
        document.body.appendChild(this.modal);

        this.titleInput = this.modal.querySelector('#modify-task-title');
        this.descriptionInput = this.modal.querySelector('#modify-task-description');
        this.dueDateInput = this.modal.querySelector('#modify-task-duedate');
        this.projectSelect = this.modal.querySelector('#modify-task-project');
        this.lowPriorityRadio = this.modal.querySelector('#modify-task-low-priority');
        this.mediumPriorityRadio = this.modal.querySelector('#modify-task-medium-priority');
        this.highPriorityRadio = this.modal.querySelector('#modify-task-high-priority');
        this.triggerButton.disabled = true;

        const projects = this.taskHandler.getAllProjects();
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            this.projectSelect.appendChild(option);
        })

        this.populateForm();

        const closeButton = this.modal.querySelector('.close-modal');
        const cancelButton = this.modal.querySelector('.cancel-modal');
        const deleteButton = this.modal.querySelector('.delete-task');
        const modifyTaskForm = this.modal.querySelector('#modify-task-form');

        closeButton.addEventListener('click', () => this.closeModal());
        cancelButton.addEventListener('click', () => this.closeModal());
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure?')) {
                this.taskHandler.removeTask(this.task)
                renderCurrentTasks();
            }
        });
        modifyTaskForm.addEventListener('submit', (event) => this.updateTask(event));
    }

    closeModal(){
        this.modal.remove();
        this.triggerButton.disabled = false;
        this.modal = null;
    }

    populateForm(){
        // Populate fields with details
        this.titleInput.value = this.task.getTitle();
        this.descriptionInput.value = this.task.getDescription();

        const dueDate = new Date(this.task.getDueDate());
        let formattedDueDate;
        if (dueDate) {
            const year = dueDate.getFullYear();
            const month = String(dueDate.getMonth() + 1).padStart(2, '0');
            const day = String(dueDate.getDate()).padStart(2, '0');
            formattedDueDate = `${year}-${month}-${day}`;
        }
        this.dueDateInput.value = formattedDueDate;

        const projectOptions = this.projectSelect.options;
        for (let i = 0; i < projectOptions.length; i++){
            if(projectOptions[i].value === this.task.getProject()) {
                projectOptions[i].selected = true;
                break;
            }
        }

        const priority = this.task.getPriority();
        if (priority === 1) {
            this.lowPriorityRadio.checked = true;
        } else if (priority === 2){
            this.mediumPriorityRadio.checked = true;
        } else if (priority === 3){
            this.highPriorityRadio.checked = true;
        }
    }

    updateTask(event){
        event.preventDefault();

        // Compare input values to set values and update if changed.
        if(this.titleInput.value !== this.task.getTitle()){
            this.taskHandler.updateTaskProperty(this.task, 'title', this.titleInput.value);
        }

        if(this.descriptionInput.value !== this.task.getDescription()){
            this.taskHandler.updateTaskProperty(this.task, 'description', this.descriptionInput.value);
        }

        const newDueDateInput = this.dueDateInput.value;
        let newDueDate;
        if (newDueDateInput) {
            const [year, month, day] = newDueDateInput.split('-').map(Number);
            newDueDate = new Date(year, month -1, day, 23, 59, 59, 599);
        }

        if(newDueDate !== this.task.getDueDate()) {
            this.taskHandler.updateTaskProperty(this.task, 'dueDate', newDueDate);
        }
        // Set priority based on checked box.

        let priority;
        if (this.lowPriorityRadio.checked) {
            priority = 1;
        } else if (this.mediumPriorityRadio.checked) {
            priority = 2;
        } else if (this.highPriorityRadio.checked) {
            priority = 3;
        }

        // Compare checked priority to existing priority and update if different.
        if (priority !== this.task.getPriority()) {
            this.taskHandler.updateTaskProperty(this.task, 'priority', priority);
        }

        const selectedProject = this.projectSelect.value;

        if (selectedProject !== this.task.getProject()) {
            this.taskHandler.updateTaskProperty(this.task, 'project', selectedProject);
        }

        renderCurrentTasks();
        
        this.closeModal();


    }

}