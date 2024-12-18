import UpdateTaskModal from "../classes/modals/updatetaskmodal";
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
        taskRow.classList.toggle('task-is-complete');
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

    const modifyTaskButton = document.createElement('button');
    modifyTaskButton.className = 'modify-task';
    modifyTaskButton.textContent = 'Modify'

    const updateTaskModal = new UpdateTaskModal(task, modifyTaskButton, taskHandler);

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.className = 'delete-task';
    deleteTaskButton.textContent = 'Delete';
    deleteTaskButton.addEventListener('click', () => {
        if(confirm('Are you sure?')){
            taskHandler.removeTask(task);
            taskRow.remove();
        }
    });

    buttonCell.append(modifyTaskButton, deleteTaskButton);

    taskRow.append(completeCell, titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, buttonCell);

    taskListContainer.appendChild(taskRow);
    task.setDomElement(taskRow);
}

export {
    renderTasks,
    renderTask
}