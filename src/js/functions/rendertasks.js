import UpdateTaskModal from "../classes/modals/updatetaskmodal";
import { renderCurrentTasks } from "..";
import { format } from "date-fns";

const taskListContainer = document.querySelector('#task-list-table');
const dateFormat = require('date-fns/format');
const renderTasks = (taskList, taskHandler) => {
    taskListContainer.textContent = '';
    const generateTableHeaders = (() => {
        const headerRow = document.createElement('tr');

        const completeCell = document.createElement('th');
        completeCell.textContent = 'Complete'
        
        const titleCell = document.createElement('th');
        titleCell.textContent = 'Title';
        
        const descriptionCell = document.createElement('th');
        descriptionCell.textContent = 'Description';
        
        const projectCell = document.createElement('th');
        projectCell.textContent = 'Project';
        
        const dueDateCell = document.createElement('th');
        dueDateCell.textContent = 'Due Date'
        
        const priorityCell = document.createElement('th');
        priorityCell.textContent = 'Priority';
        
        const buttonCell = document.createElement('th');

        headerRow.append(completeCell, titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, buttonCell);
        taskListContainer.appendChild(headerRow);
    })();

    taskList.forEach((task) => {
        renderTask(task, taskHandler);
    })
}

const renderTask = (task, taskHandler) => {
    const taskRow = document.createElement('tr');

    const completeCell = document.createElement('td');
    completeCell.className = 'task-complete';
    const completeCheckbox = document.createElement('input');
    completeCheckbox.setAttribute('type', 'checkbox');
    completeCheckbox.className = 'complete-checkbox';

    completeCell.appendChild(completeCheckbox);

    if (task.getComplete()){
        completeCheckbox.checked = true;
        taskRow.classList.add('task-is-complete');
    } else {
        completeCheckbox.checked = false;
    }

    completeCheckbox.addEventListener('change', () => {
        taskHandler.updateTaskProperty(task, 'complete');
        renderCurrentTasks();
    })

    
    const titleCell = document.createElement('td');
    titleCell.className = 'task-title';
    titleCell.textContent = task.getTitle();

    const descriptionCell = document.createElement('td');
    descriptionCell.className = 'task-description';
    descriptionCell.textContent = task.getDescription();

    const projectCell = document.createElement('td');
    projectCell.className = 'task-project';
    projectCell.textContent = task.getProject();

    const dueDateCell = document.createElement('td');
    dueDateCell.className = 'task-due-date';
    if(task.getDueDate()){
        const dueDate = new Date(task.getDueDate());
        const today = new Date();
        if (dueDate < today && !task.getComplete()) {
            taskRow.classList.add('overdue-task');
        }
        const formattedDueDate = format(task.getDueDate(), 'MMMM dd, yyyy')
        dueDateCell.textContent = formattedDueDate;
    }

    const priorityCell = document.createElement('td');
    priorityCell.className = 'task-priority';
    let taskPriority;
    if(task.getPriority() === 1){
        taskPriority = 'Low';
        taskRow.classList.add('low-priority-task')
    } else if (task.getPriority() === 2) {
        taskPriority = 'Medium';
        taskRow.classList.add('medium-priority-task')
    } else if (task.getPriority() === 3) {
        taskPriority = 'High';
        taskRow.classList.add('high-priority-task')
    }
    priorityCell.textContent = `${taskPriority} Priority`


    const buttonCell = document.createElement('td');
    buttonCell.className = 'task-buttons';

    const modifyTaskButton = document.createElement('button');
    modifyTaskButton.className = 'modify-task';
    modifyTaskButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-circle</title><path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M15.1,7.07C15.24,7.07 15.38,7.12 15.5,7.23L16.77,8.5C17,8.72 17,9.07 16.77,9.28L15.77,10.28L13.72,8.23L14.72,7.23C14.82,7.12 14.96,7.07 15.1,7.07M13.13,8.81L15.19,10.87L9.13,16.93H7.07V14.87L13.13,8.81Z" /></svg>'

    const updateTaskModal = new UpdateTaskModal(task, modifyTaskButton, taskHandler);

    buttonCell.appendChild(modifyTaskButton);

    taskRow.append(completeCell, titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, buttonCell);

    taskListContainer.appendChild(taskRow);
    task.setDomElement(taskRow);
}

export {
    renderTasks,
    renderTask
}