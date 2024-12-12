import "../css/styles.css";
import TaskHandler from "./classes/tasks/taskhandler";
import NewTaskModal from "./classes/modals/newtaskmodal";
import { renderTasks } from "./functions/rendertasks";
import filterTasks from "./functions/filtertasks";
import sortTasks from "./functions/sorttasks";

const taskHandler = new TaskHandler();

const newTaskButton = document.querySelector('#add-task-button');
const newTaskModal = new NewTaskModal(newTaskButton, taskHandler);

const generateTaskList = (filterMethod, project, priority) => {
    return filterTasks(taskHandler, filterMethod, project, priority)
}

const defaultTasks = generateTaskList('all');

sortTasks(defaultTasks, 'default', 'acs');

renderTasks(defaultTasks, taskHandler);