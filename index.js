const addTask = document.querySelector(".form__textarea");
const taskList = document.querySelector(".taskList");
const removeButton = document.querySelector(".remove");
let date = new Date();
let str  = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
const modalWindow = document.querySelector(".modalWindow");
const descriptionName = document.querySelector(".description__name");
const confirmButton = document.querySelector(".confirmButton");
const editButton = document.querySelector(".edit");



const lockItems = () => {
    const pars = document.querySelectorAll(".taskElem");
    const buttonConfigs = document.querySelectorAll(".buttonConfig__active");
    const chexboxes = document.querySelectorAll(".checkbox__item");
    for (let el of pars){
        el.classList.remove("taskElem");
        el.classList.add("taskElem_after");
    }
    for (let buts of buttonConfigs){
        buts.disabled = true;
    }
    for (let cheBox of chexboxes){
        cheBox.disabled = true;
    }
}

const unlockItems = () => {
    const pars = document.querySelectorAll(".taskElem_after");
    const buttonConfigs = document.querySelectorAll(".buttonConfig__active");
    const chexboxes = document.querySelectorAll(".checkbox__item");
    for (let buts of buttonConfigs){
        buts.disabled = false;
    }
    for (let cheBox of chexboxes){
        cheBox.disabled = false;
    }
    for (let el of pars){
        el.classList.add("taskElem");
        el.classList.remove("taskElem_after");
    }
    addTask.disabled = false;
    
}


const changeDescription = () => {
    addTask.placeholder ="Enter task title";
}

const returnDescription = () => {
    addTask.placeholder = "Add task";
    addTask.value="";
}

const createTask = (e) => {
    if(e.code === "Enter" && addTask.value !=Number(0)){
        e.preventDefault();
        const taskElem = document.createElement("div");
        taskElem.classList.add("taskElem");
        taskList.appendChild(taskElem);
        const par = document.createElement("p");
        par.classList.add("taskList__item");
        const chbox = document.createElement('input');
        chbox.type="checkbox";
        chbox.classList.add("checkbox__item");
        taskElem.appendChild(chbox);
        par.textContent = addTask.value;
        taskElem.appendChild(par);
        const dateOpened = document.createElement("div");
        dateOpened.classList.add("dateOpened");
        dateOpened.textContent = "Date open:"+ " " + str;
        taskElem.appendChild(dateOpened);
        const dateClosed = document.createElement("div");
        dateClosed.classList.add("dateClosed");
        taskElem.appendChild(dateClosed);
        const buttonConfig = document.createElement("input");
        buttonConfig.type = "button";
        buttonConfig.value = "...";
        buttonConfig.classList.add("buttonConfig__active");
        taskElem.appendChild(buttonConfig);
        buttonConfig.addEventListener("click", function(){
            lockItems();
            const ddd = document.createElement("div");
            ddd.classList.add("ddd");
            taskElem.appendChild(ddd);
            const editShort = document.createElement("div");
            const removeShort = document.createElement("div");
            const skip = document.createElement("div");
            skip.classList.add("crossed");
            editShort.textContent = "Edit";
            editShort.classList.add("editShort")
            ddd.appendChild(editShort);
            removeShort.textContent = "Remove";
            removeShort.classList.add("removeShort")
            ddd.appendChild(removeShort);
            ddd.appendChild(skip);
            addTask.disabled = true;
            skip.addEventListener("click", function(){
                unlockItems();
                ddd.remove();
                taskElem.classList.add("taskElem");
                taskElem.classList.remove("taskElem_after");
            });
            removeShort.addEventListener("click", function(){
                unlockItems();
                taskElem.remove();
            });
            
            editShort.addEventListener("click", function(){
                ddd.remove();
             
                //не работает//
                modalWindow.classList.toggle("modalWindow__disabled");
                
            });
            confirmButton.addEventListener("click", function(){
                
                par.textContent = descriptionName.value;
                modalWindow.classList.add("modalWindow__disabled");
                unlockItems();
            });   
            
            
        });
        
        
        chbox.addEventListener("click", function(){
            if(chbox.checked){
                par.classList.toggle("completedTask");
                dateClosed.classList.add("dateClosed");
                dateClosed.classList.remove("dateClosed__disabled");
                dateClosed.textContent = "Date closed:"+ " " + str;
                removeButton.addEventListener("click", function(){
                    if(chbox.checked){
                        taskElem.classList.add("dateClosed__disabled");
                    }
                });
            } else {
                par.classList.toggle("completedTask");
                dateClosed.classList.toggle("dateClosed__disabled");   
            }
        });
        addTask.value="";
    } 
}

addTask.addEventListener("focus", changeDescription);
addTask.addEventListener("blur", returnDescription);
addTask.addEventListener("keydown",createTask);
