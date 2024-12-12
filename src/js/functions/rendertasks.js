import TaskDetailModal from "../classes/modals/taskdetailmodal";

const taskListContainer = document.querySelector('#task-list-table');
const renderTasks = (taskList, taskHandler) => {
    taskListContainer.textContent = '';
    const generateTableHeaders = (() => {
        const headerRow = document.createElement('tr');

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
        
        const completeCell = document.createElement('th');
        completeCell.textContent = 'Complete'
        
        const buttonCell = document.createElement('th');

        headerRow.append(titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, completeCell, buttonCell);
        taskListContainer.appendChild(headerRow);
    })();

    taskList.forEach((task) => {
        renderTask(task, taskHandler);
    })
}

const renderTask = (task, taskHandler) => {
    const taskRow = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = task.getTitle();

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = task.getDescription();

    const projectCell = document.createElement('td');
    projectCell.textContent = task.getProject();

    const dueDateCell = document.createElement('td');
    if(task.getDueDate()){
        dueDateCell.textContent = task.getDueDate();
    }

    const priorityCell = document.createElement('td');
    if(task.getPriority() === 1){
        priorityCell.textContent = 'Low';
    } else if (task.getPriority() === 2) {
        priorityCell.textContent = 'Medium';
    } else if (task.getPriority() === 3) {
        priorityCell.textContent = 'High';
    }

    const completeCell = document.createElement('td');
    if(task.getComplete()){
        completeCell.textContent = 'Complete';
    } else {
        completeCell.textContent = 'Incomplete';
    }

    const buttonCell = document.createElement('td');

    const toggleCompleteButton = document.createElement('button');
    toggleCompleteButton.className = 'toggle-complete';
    toggleCompleteButton.textContent = 'Toggle Complete'
    toggleCompleteButton.addEventListener('click', () => {
        taskHandler.updateTaskProperty(task, 'complete');
        if(task.getComplete()){
            completeCell.textContent = 'Complete';
        } else {
            completeCell.textContent = 'Incomplete';
        }
    })

    const modifyTaskButton = document.createElement('button');
    modifyTaskButton.className = 'modify-task';
    modifyTaskButton.textContent = 'Modify'

    const taskDetailModal = new TaskDetailModal(task, modifyTaskButton, taskHandler);

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.className = 'delete-task';
    deleteTaskButton.textContent = 'Delete';
    deleteTaskButton.addEventListener('click', () => {
        if(confirm('Are you sure?')){
            taskHandler.removeTask(task);
            taskRow.remove();
        }
    });

    buttonCell.append(toggleCompleteButton, modifyTaskButton, deleteTaskButton);

    taskRow.append(titleCell, descriptionCell, projectCell, dueDateCell, priorityCell, completeCell, buttonCell);

    taskListContainer.appendChild(taskRow);
}

export {
    renderTasks,
    renderTask
}