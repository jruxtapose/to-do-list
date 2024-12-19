
// Contains all information and methods for each task
export default class Task{
    constructor(title, description, dueDate, priority, complete){
        this._title = title,
        this._description = description,
        this._dueDate = dueDate,
        this._priority = priority,
        this._complete = complete;
        this._project = null;
        this._createdOn = new Date();
    }

    // Get/Set each property

    getTitle(){
        return this._title;
    }

    setTitle(newTitle){
        this._title = newTitle;
    }

    getDescription(){
        return this._description;
    }

    setDescription(newDescription){
        this._description = newDescription;
    }

    getDueDate(){
        return this._dueDate;
    }

    setDueDate(newDueDate){
        this._dueDate = newDueDate;
    }

    getPriority(){
        return this._priority;
    }

    setPriority(newPriority){
        this._priority = newPriority;
    }

    getComplete(){
        return this._complete;
    }

    toggleComplete(){
        this._complete = !this._complete;
    }

    getProject(){
        return this._project;
    }

    setProject(newProject){
        this._project = newProject;
    }

    removeProject(){
        this._project = null;
    }

    getCreatedOn(){
        return this._createdOn;
    }

    // Used for addressing the DOM and updating.
    setDomElement(element) {
        this.domElement = element;
    }

    getDomElement() {
        return this.domElement;
    }

}
