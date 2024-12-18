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

            const projectsListContainer = document.querySelector('.sidebar-projects-list');
            const projectDisplay = document.createElement('div');
            projectDisplay.className = 'project';
    
            const projectTitle = document.createElement('div');
            projectTitle.className = 'project-title';
            projectTitle.textContent = `#${title}`;
            projectDisplay.appendChild(projectTitle);
    
            const deleteProjectButton = document.createElement('button');
            deleteProjectButton.className = 'delete-project';
            deleteProjectButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>'
            deleteProjectButton.addEventListener('click', () => {
                if(confirm('Are you sure?')) {
                    this.taskHandler.removeProject(title, projectDisplay);
                }
            })
            projectDisplay.appendChild(deleteProjectButton);
    
            projectsListContainer.appendChild(projectDisplay);
            this.closeModal();
        }


    }
}