import UpdateTaskModal from "../classes/modals/updatetaskmodal";
import { renderCurrentTasks } from "..";
import { format } from "date-fns";

const taskListContainer = document.querySelector('.main');
const dateFormat = require('date-fns/format');
const renderTasks = (taskList, taskHandler) => {
    taskListContainer.textContent = '';

    taskList.forEach((task) => {
        renderTask(task, taskHandler);
    })
}

const renderTask = (task, taskHandler) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    const taskCardTopRow = document.createElement('div');
    taskCardTopRow.className = 'task-card-top-row';

    const taskTitle = document.createElement('h2');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.getTitle();

    const taskPriority = document.createElement('h3');
    taskPriority.className = 'task-priority';
    if (task.getPriority() === 3) {
        taskPriority.textContent = 'High Priority';
        if (!task.getComplete()) {
            taskCard.classList.add('high-priority');
        }
    } else if (task.getPriority() === 2) {
        taskPriority.textContent = 'Medium Priority';
        if (!task.getComplete()) {
            taskCard.classList.add('medium-priority');
        }
    } else if (task.getPriority() === 1) {
        taskPriority.textContent = 'Low Priority';
        if (!task.getComplete()) {
            taskCard.classList.add('low-priority');
        }
    };

    taskCardTopRow.append(taskTitle, taskPriority);
    taskCard.appendChild(taskCardTopRow);

    const taskProject = document.createElement('h3');
    taskProject.className = 'task-project';
    if (task.getProject()) {
        taskProject.textContent = task.getProject();
    }
    taskCard.appendChild(taskProject);

    const taskDueDate = document.createElement('h4');
    taskDueDate.className = 'task-due-date';
    if(task.getDueDate()){
        const dueDate = new Date(task.getDueDate());
        const today = new Date();
        if (dueDate < today && !task.getComplete()) {
            taskCard.classList.add('overdue-task');
        }
        const formattedDueDate = format(task.getDueDate(), 'MMMM dd, yyyy')
        taskDueDate.textContent = `Due: ${formattedDueDate}`;
        taskCard.appendChild(taskDueDate);
    }

    const taskDescription = document.createElement('p');
    taskDescription.className = 'task-description';
    if (task.getDescription()) {
        const taskDescriptionWithLineBreaks = task.getDescription().replace(/\n/g, '<br>');
        taskDescription.innerHTML = taskDescriptionWithLineBreaks;
    };
    taskCard.appendChild(taskDescription);

    const taskCardBottomRow = document.createElement('div');
    taskCardBottomRow.className = 'task-card-bottom-row'

    const taskCompleteLabel = document.createElement('label');
    taskCompleteLabel.className = 'task-complete-label';

    const taskComplete = document.createElement('input');
    taskComplete.setAttribute('type', 'checkbox');
    taskComplete.className = 'task-complete';
    if(task.getComplete()) {
        taskComplete.checked = true;
        taskCard.classList.add('complete-task');
    } else {
        taskComplete.checked = false;
    };
    taskComplete.addEventListener('change', () => {
        taskHandler.updateTaskProperty(task, 'complete');
        if (task.getComplete()) {
            console.log(`${task.getTitle()} marked complete.`)
        }
        renderCurrentTasks();
    })
    taskCompleteLabel.appendChild(taskComplete);

    const textCompleteText = document.createElement('p');
    textCompleteText.textContent = 'Complete';
    taskCompleteLabel.appendChild(textCompleteText);

    const modifyButton = document.createElement('button');
    modifyButton.className = 'modify-button';
    modifyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Modify</title><path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M15.1,7.07C15.24,7.07 15.38,7.12 15.5,7.23L16.77,8.5C17,8.72 17,9.07 16.77,9.28L15.77,10.28L13.72,8.23L14.72,7.23C14.82,7.12 14.96,7.07 15.1,7.07M13.13,8.81L15.19,10.87L9.13,16.93H7.07V14.87L13.13,8.81Z" /></svg>';
    const updateTaskModal = new UpdateTaskModal(task, modifyButton, taskHandler);

    taskCardBottomRow.append(taskCompleteLabel, modifyButton);

    taskCard.appendChild(taskCardBottomRow);

    taskListContainer.appendChild(taskCard);


}
export {
    renderTasks,
    renderTask
}