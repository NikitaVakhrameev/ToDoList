const addTask = document.querySelector(".form__textarea");
const taskList = document.querySelector(".taskList");
let date = new Date();
let str  = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(); 
const modalWindow = document.querySelector(".modalWindow");
const descriptionName = document.querySelector(".description__name");
const confirmButton = document.querySelector(".confirmButton");
const editButton = document.querySelector(".edit");

const changeDescription = () => {
  addTask.placeholder ="Enter task title";
}

const returnDescription = () => {
  addTask.placeholder = "Add task";
  addTask.value="";
}

const createTask = (e) => {
if(e.code === "Space" && addTask.value !=Number(0)){
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
    const config__window = document.createElement("div");
    config__window.classList.add("config__window");
    taskElem.appendChild(config__window);
    const editShort = document.createElement("div");
    const removeShort = document.createElement("div");
    const skip = document.createElement("div");
    skip.classList.add("crossed");
    editShort.textContent = "Edit";
    editShort.classList.add("editShort")
    config__window.appendChild(editShort);
    removeShort.textContent = "Remove";
    removeShort.classList.add("removeShort")
    config__window.appendChild(removeShort);
    config__window.appendChild(skip);
    const cxhbox = document.querySelectorAll(".checkbox__item");
    for(let cx of cxhbox){
      cx.disabled = true;
    }
    const taskelem = document.querySelectorAll(".taskElem");
    for (let item of taskelem){
      item.classList.add("taskElem_after");
      item.classList.remove("taskElem");
    }
    const butConf = document.querySelectorAll(".buttonConfig__active");
    for (let bconf of butConf){
      bconf.disabled = true;
    }
    addTask.disabled = true;
    skip.addEventListener("click", function(){
      for(let cx of cxhbox){
      cx.disabled = false;
    }
      for (let item of taskelem){
      item.classList.remove("taskElem_after");
      item.classList.add("taskElem");
    }
      for (let bconf of butConf){
      bconf.disabled = false;
    }
      addTask.disabled = false;
      config__window.remove();
      
    });
    removeShort.addEventListener("click", function(){
      taskElem.remove();
      for(let cx of cxhbox){
      cx.disabled = false;
    }
      for (let bconf of butConf){
      bconf.disabled = false;
    }
      for (let item of taskelem){
      item.classList.remove("taskElem_after");
      item.classList.add("taskElem");
    }
      addTask.disabled = false;
    });
    editShort.addEventListener("click", function(){
      config__window.remove();
      modalWindow.classList.toggle("modalWindow__disabled");
      confirmButton.addEventListener("click", function(){
        par.textContent = descriptionName.value;
        modalWindow.classList.add("modalWindow__disabled");
        for (let item of taskelem){
          item.classList.remove("taskElem_after");
          item.classList.add("taskElem");
        }
        for (let bconf of butConf){
          bconf.disabled = false;
        }
         for(let cx of cxhbox){
           cx.disabled = false;
         }
        addTask.disabled = false;
      });
    });
  });
     
  chbox.addEventListener("click", function(){
    if(chbox.checked){
      par.classList.toggle("completedTask");
      dateClosed.classList.add("dateClosed");
      dateClosed.classList.remove("dateClosed__disabled");
  dateClosed.textContent = "Date closed:"+ " " + str;
  /*removeButton.addEventListener("click", function(){
    if(chbox.checked){
      taskElem.classList.add("dateClosed__disabled");
    }
    
  });*/
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
