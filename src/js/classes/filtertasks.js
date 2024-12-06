import TaskHandler from "./taskhandler";
const taskHandler = new TaskHandler();

const filterByProject = (project) => {
    return taskHandler.getAllTasks().filter((task) => task.getProject() === project);
}

const filterByPriority = (priority) => {
    return taskHandler.getAllTasks().filter((task) => task.getPriority() === priority);
}

const filterByOverDue = () => {
    today = new Date();
    return taskHandler.getAllTasks().filter((task) => {
        const dueDate = new Date(task.getDueDate());
        return dueDate < today;
    });
}

const filterByToday = () => {
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

const filterByNextSevenDays = () => {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return taskHandler.getAllTasks().filter((task) => {
        const dueDate = new Date(task.getDueDate());
        return dueDate >= today && dueDate <= sevenDaysFromNow;
    });
}

export default function filterProjects(filter, project, priority){
    switch(filter){
        case 'all':
            return taskHandler.getAllTasks();
        case 'today':
            return filterByToday();
        case 'nextSevenDays':
            return filterByNextSevenDays;
        case 'overdue':
            return filterByOverDue;
        case 'priority':
            return filterByPriority(priority);
        case 'project':
            return filterByProject(project);
    }
}