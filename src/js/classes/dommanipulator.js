import { getAllTasks, getTask, createTask } from "./tasks.js";
import { saveTasks, loadTasks } from "./localstorage.js"

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
    createTaskModal.textContent = 'This will have a form to create a new task';

    const closeModalButton = document.createElement('button');
    closeModalButton.id = 'close-form';
    closeModalButton.textContent = 'close';
    closeModalButton.onclick = function(){
        const createTaskButton = document.querySelector('#create-task');
        createTaskButton.disabled = false;
        createTaskModal.remove();
    }
    createTaskModal.appendChild(closeModalButton);

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
