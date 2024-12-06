import { getAllTasks, getTask, createTask } from "./tasks.js";
import { saveTasks, loadTasks } from "./localstorage.js";

// Define content areas
const sidebar = document.querySelector('.sidebar');

const content = document.querySelector('.content');

// Create function buttons in sidebar
const sidebarButtons = (() => {
    // Create button to load saved tasks from local storage, will be automated later
    const loadButton = document.createElement('button');
    loadButton.id = 'load-tasks';
    loadButton.textContent = 'Load Tasks';
    loadButton.addEventListener('click', () => {
        loadTasks();
        refreshTasks();
    });

    // Create Button to save current tasks to local storage, will be automated later
    const saveButton = document.createElement('button');
    saveButton.id = 'save-tasks';
    saveButton.textContent = 'Save Tasks';
    saveButton.addEventListener('click', () => saveTasks());

    
    const createTaskButton = document.createElement('button');
    createTaskButton.id = 'create-task';
    createTaskButton.textContent = 'Add new task'
    createTaskButton.onclick = function(){
        createTaskButton.disabled = true;
        createTaskForm();
    }

    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh'
    refreshButton.addEventListener('click', () => refreshTasks());
    
    sidebar.append(loadButton, saveButton, createTaskButton, refreshButton);

})()

// Generate modal for use in creating new tasks
const createTaskForm = () => {
    const createTaskModal = document.createElement('div');
    createTaskModal.id = 'create-new-task-form';

    const form = document.createElement('form');
    
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'new-task-title');
    titleInputLabel.textContent = 'New Task Title:';
    
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'new-task-title';
    titleInput.setAttribute('name', 'new-task-title');
    titleInput.required = true;
    
    const titleInputContainer = document.createElement('div');
    titleInputContainer.append(titleInputLabel, titleInput);

    const descriptionInputLabel = document.createElement('label');
    descriptionInputLabel.setAttribute('for', 'new-task-description');
    descriptionInputLabel.textContent = 'New Task Description';

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.id = 'new-task-description';
    descriptionInput.setAttribute('name', 'new-task-description');

    const descriptionInputContainer = document.createElement('div');
    descriptionInputContainer.append(descriptionInputLabel, descriptionInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'new-task-due-date');
    dueDateLabel.textContent = 'New Task Due Date:'

    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.id = 'new-task-due-date';
    dueDateInput.setAttribute('name', 'new-task-due-date');
    dueDateInput.required = true;

    const dueDateInputContainer = document.createElement('div');
    dueDateInputContainer.append(dueDateLabel, dueDateInput);

    const lowPriorityLabel = document.createElement('label');
    lowPriorityLabel.setAttribute('for', 'low-priority-radio');
    lowPriorityLabel.textContent = 'Low Priority';
    
    const lowPriorityRadio = document.createElement('input');
    lowPriorityRadio.setAttribute('type', 'radio');
    lowPriorityRadio.id = 'low-priority-radio';
    lowPriorityRadio.setAttribute('name', 'priority-radio');
    lowPriorityRadio.value = '1';

    const lowPriorityRadioContainer = document.createElement('div');
    lowPriorityRadioContainer.append(lowPriorityLabel, lowPriorityRadio);
    
    const mediumPriorityLabel = document.createElement('label');
    mediumPriorityLabel.setAttribute('for', 'medium-priority-radio');
    mediumPriorityLabel.textContent = 'Medium Priority';
    
    const mediumPriorityRadio = document.createElement('input');
    mediumPriorityRadio.setAttribute('type', 'radio');
    mediumPriorityRadio.id = 'medium-priority-radio';
    mediumPriorityRadio.setAttribute('name', 'priority-radio');
    mediumPriorityRadio.value = '2';

    const mediumPriorityRadioContainer = document.createElement('div');
    mediumPriorityRadioContainer.append(mediumPriorityLabel, mediumPriorityRadio);
    
    const highPriorityLabel = document.createElement('label');
    highPriorityLabel.setAttribute('for', 'high-priority-radio');
    highPriorityLabel.textContent = 'High Priority';
    
    const highPriorityRadio = document.createElement('input');
    highPriorityRadio.setAttribute('type', 'radio');
    highPriorityRadio.id = 'medium-priority-radio';
    highPriorityRadio.setAttribute('name', 'priority-radio');
    highPriorityRadio.value = '3';

    const highPriorityRadioContainer = document.createElement('div');
    highPriorityRadioContainer.append(highPriorityLabel, highPriorityRadio);

    const priorityRadiosContainer = document.createElement('div');
    priorityRadiosContainer.append(lowPriorityRadioContainer, mediumPriorityRadioContainer, highPriorityRadioContainer);

    const completeCheckboxLabel = document.createElement('label');
    completeCheckboxLabel.setAttribute('for', 'new-task-complete');
    completeCheckboxLabel.textContent = 'Task Complete'

    const completeCheckbox = document.createElement('input');
    completeCheckbox.setAttribute('type', 'checkbox');
    completeCheckbox.id = 'new-task-complete';
    completeCheckbox.setAttribute('name', 'new-task-complete');
    completeCheckbox.value = 'Complete';

    const completeCheckboxContainer = document.createElement('div');
    completeCheckboxContainer.append(completeCheckboxLabel, completeCheckbox);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add task';

    form.append(titleInputContainer, descriptionInputContainer, dueDateInputContainer, priorityRadiosContainer, completeCheckboxContainer, submitButton);


    createTaskModal.textContent = 'This will have a form to create a new task';

    const closeModalButton = document.createElement('button');
    closeModalButton.id = 'close-form';
    closeModalButton.textContent = 'close';
    closeModalButton.onclick = function(){
        const createTaskButton = document.querySelector('#create-task');
        createTaskButton.disabled = false;
        createTaskModal.remove();
    }
    
    createTaskModal.append(form, closeModalButton);
    document.body.appendChild(createTaskModal);
}

// Clear the content window and reload all tasks
const refreshTasks = () => {
    content.textContent = '';
    loadTasksDom();
}

// Render all tasks to the DOM
const loadTasksDom = () => {
    const taskList = document.createElement('ul');
    taskList.id = 'tasklist'
    content.appendChild(taskList);
    for(const task in getAllTasks()){
        const thisTask = getTask(task);

        const taskContainer = document.createElement('li');
        taskContainer.className = 'task-item';

        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = thisTask.title;

        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.textContent = thisTask.description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete task';
        deleteButton.className = 'delete-task-button';

        deleteButton.addEventListener('click', () => {
            if(confirm('Are you sure you want to delete this task?')){
                if(thisTask){
                    thisTask.removeTask();
                    taskContainer.remove();
                    console.log(getAllTasks());
                }
            }
        });
        
        taskContainer.append(taskTitle, taskDescription, deleteButton);
        taskList.appendChild(taskContainer)

    }
}

// Initial content load
loadTasksDom();
