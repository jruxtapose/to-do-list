import { renderProject } from "../..";
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

        const closeButton = this.modal.querySelector('.close-modal');
        const cancelButton = this.modal.querySelector('.cancel-modal');

        const newProjectForm = this.modal.querySelector('#add-project-form');
        newProjectForm.addEventListener('submit', (e) => this.handleSubmit(e));
        

        closeButton.addEventListener('click', () => this.closeModal());
        cancelButton.addEventListener('click', () => this.closeModal());
    }

    closeModal(){
        this.modal.remove();
        this.triggerButton.disabled = false;
        this.modal = null;
    }

    handleSubmit(event){
        event.preventDefault();

        const title = this.modal.querySelector('#add-project-title').value;
        if(this.taskHandler.getAllProjects().includes(title)){
            alert('Project already exists.')
        } else {
            this.taskHandler.addNewProject(title);

            renderProject(title);
            this.closeModal();
        }


    }
}