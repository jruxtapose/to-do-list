export default function sortTasks(taskList, sortMethod, direction){
    switch (sortMethod){
        case 'default':
            defaultSort(taskList);
            break;
        case 'date':
            sortByDate(taskList, direction);
            break;
        case 'priority':
            sortByPriority(taskList, direction);
            break;
        case 'complete':
            sortByComplete(taskList, direction);
            break;
        case 'project':
            sortByProject(taskList,direction);
            break;
        default:
            throw console.error('Invalid sort method.');
    }
}

const defaultSort = (taskList) => {
    return taskList;
}

const sortByDate = (taskList, direction) => {
    taskList.sort((a, b) => {
        const dueDateA = new Date(a.getDueDate());
        const dueDateB = new Date(b.getDueDate());

        if (direction === 'asc'){
            return dueDateA - dueDateB;
        } else {
            return dueDateB - dueDateA;
        }
    });
};

const sortByPriority = (taskList, direction) => {
    taskList.sort((a, b) => {
        const priorityA = a.getPriority();
        const priorityB = b.getPriority();

        if (direction === 'asc'){
            return priorityA - priorityB;
        }else{
            return priorityB - priorityA;
        }
    })
}

const sortByComplete = (taskList, direction) => {
    taskList.sort((a,b) => {
        const completeA = a.getComplete();
        const completeB = b.getComplete();

        if(direction === 'asc'){
            if (!completeA && completeB){
                return -1;
            }else if(completeA && !completeB){
                return 1;
            } else {
                return 0;
            }
        }else{
            if(completeA && !completeB){
                return -1;
            }else if (!completeA && completeB){
                return 1;
            }else {
                return 0;
            }
        }
    });
}

const sortByProject = (taskList, direction) => {
    taskList.sort((a,b) => {
        const projectA = a.getProject();
        const projectB = b.getProject();

        if (projectA === null && projectB === null){
            return 0;
        }else if (projectA === null){
            return direction === 'asc' ? -1 : 1;
        }else if (projectB === null){
            return direction === 'asc' ? 1: -1;
        }else{
            return direction === 'asc'
                ? projectA.localCompare(projectB)
                : projectB.localCompare(projectA);
        }
        
    })
}