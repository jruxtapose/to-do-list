import "../../../css/modifytaskmodal.css"
const taskDetailTemplate = document.querySelector('#modify-task-modal-template');
taskDetailTemplate.remove();

export default class TaskDetailModal{
    constructor(task, triggerButton, taskHandler){
        this.triggerButton = triggerButton,
        this.template = taskDetailTemplate,
        this.modal = null;
        this.taskHandler = taskHandler;
        this.task = task,
        this.triggerButton.addEventListener('click', () => this.openModal());
    };

    openModal() {
        this.triggerButton.disabled = true;
        this.modal = this.template.cloneNode(true);
        this.modal.id = 'modify-task-modal';
        document.body.appendChild(this.modal);

        this.populateForm();

        const closeButton = this.modal.querySelector('#close-modal');
        const cancelButton = this.modal.querySelector('#cancel-modal');

        closeButton.addEventListener('click', () => this.closeModal());
        cancelButton.addEventListener('click', () => this.closeModal());
    }

    closeModal(){
        this.modal.remove();
        this.triggerButton.disabled = false;
        this.modal = null;
    }

    populateForm(){
        const titleInput = this.modal.querySelector('#modify-task-title');
        const descriptionInput = this.modal.querySelector('#modify-task-description');
        const dueDateInput = this.modal.querySelector('#modify-task-duedate');
        const projectSelect = this.modal.querySelector('#modify-task-project');
        const lowPriorityRadio = this.modal.querySelector('#modify-task-low-priority');
        const mediumPriorityRadio = this.modal.querySelector('#modify-task-medium-priority');
        const highPriorityRadio = this.modal.querySelector('#modify-task-high-priority');

        // Populate fields with details
        titleInput.value = this.task.getTitle();
        descriptionInput.value = this.task.getDescription();
        dueDateInput.value = this.task.getDueDate();

        const projectOptions = projectSelect.options;
        for (let i = 0; i < projectOptions.length; i++){
            if(projectOptions[i].value === this.task.getProject()) {
                projectOptions[i].selected = true;
                break;
            }
        }

        const priority = this.task.getPriority();
        if (priority === 1) {
            lowPriorityRadio.checked = true;
        } else if (priority === 2){
            mediumPriorityRadio.checked = true;
        } else if (priority === 3){
            highPriorityRadio.checked = true;
        }
    }

    updateTask(){

    }

}