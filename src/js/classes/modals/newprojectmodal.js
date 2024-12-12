import "../../../css/newprojectmodal.css"
const newProjectTemplate = document.querySelector('#add-project-modal-template');
newProjectTemplate.remove();
export default class NewProjectModal{
    constructor(triggerButton, taskHandler){
        this.triggerButton = triggerButton,
        this.template = newProjectTemplate,
        this.modal = null,
        this.taskHandler = taskHandler;
        this.triggerButton.addEventListener('click', () => this.openModal());
    }

    openModal(){
        this.triggerButton.disabled = true;
        this.modal = this.template.cloneNode(true);
        this.modal.id = 'new-project-modal';
        document.body.appendChild(this.modal);

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
}