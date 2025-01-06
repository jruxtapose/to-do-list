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
        taskCard.classList.add('high-priority');
    } else if (task.getPriority() === 2) {
        taskPriority.textContent = 'Medium Priority';
        taskCard.classList.add('medium-priority');
    } else if (task.getPriority() === 1) {
        taskPriority.textContent = 'Low Priority';
        taskCard.classList.add('low-priority');
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
        taskDescription.textContent = task.getDescription();
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
        taskCard.classList.add = 'complete-task';
    } else {
        taskComplete.checked = false;
    };
    taskComplete.addEventListener('change', () => {
        taskHandler.updateTaskProperty(task, 'complete');
        renderCurrentTasks();
    })
    taskCompleteLabel.appendChild(taskComplete);

    const textCompleteText = document.createElement('p');
    textCompleteText.textContent = 'Complete';
    taskCompleteLabel.appendChild(textCompleteText);

    const modifyButton = document.createElement('button');
    modifyButton.className = 'modify-button';
    modifyButton.textContent = 'Update';
    const updateTaskModal = new UpdateTaskModal(task, modifyButton, taskHandler);

    taskCardBottomRow.append(taskCompleteLabel, modifyButton);

    taskCard.appendChild(taskCardBottomRow);

    taskListContainer.appendChild(taskCard);


}
export {
    renderTasks,
    renderTask
}