// Exported function is a switch that calls the requested method of sorting. taskHandler instance is passed into this as an argument to ensure only one instance
// of the taskhandler needs to be created.

export default function filterTasks(taskHandler, filter, project, priority){

    switch(filter){
        case 'all':
            return taskHandler.getAllTasks();
        case 'today':
            return filterByToday(taskHandler);
        case 'nextSevenDays':
            return filterByNextSevenDays(taskHandler);
        case 'overdue':
            return filterByOverDue(taskHandler);
        case 'priority':
            return filterByPriority(taskHandler, priority);
        case 'project':
            return filterByProject(taskHandler, project);
        default:
            throw console.error('Invalid filter method');
    }
}

const filterByProject = (taskHandler, project) => {
    return taskHandler.getAllTasks().filter((task) => task.getProject() === project);
}

const filterByPriority = (taskHandler, priority) => {
    return taskHandler.getAllTasks().filter((task) => task.getPriority() === priority);
}

const filterByOverDue = (taskHandler) => {
    const today = new Date();
    return taskHandler.getAllTasks().filter((task) => {
        if (task.getComplete()) {
            return false;
        }
        const dueDate = new Date(task.getDueDate());
        return dueDate < today;
    });
}

const filterByToday = (taskHandler) => {
    const today = new Date();
    return taskHandler.getAllTasks().filter((task) => {
        const dueDate = new Date(task.getDueDate());
        return (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
        );
    })
}

const filterByNextSevenDays = (taskHandler) => {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return taskHandler.getAllTasks().filter((task) => {
        const dueDate = new Date(task.getDueDate());
        return dueDate >= today && dueDate <= sevenDaysFromNow;
    });
}