const tasksDiv = document.getElementById("tasksDiv");
const textAreaDescription = document.getElementById('textAreaDescription')
const addTaskButton = document.getElementById('addTaskButton')

async function getTasks() {
  const data = await fetch("/api/getTasks").then(async (res) => {
    const rows = await res.json();
    return rows;
  });
  showTasks(data);
}

function showTasks(data) {
  data.forEach((task) => {
    //imas description, user, completed, id pa sad pomocu js-a ubaci
    const tasksPlaceholder = document.createElement("div");
    tasksPlaceholder.classList = "tasks";
    tasksDiv.appendChild(tasksPlaceholder);

    const titlePlaceholder = document.createElement("div");
    titlePlaceholder.textContent =
      task.user + ": " + task.description + " " + " " + task.id;
    titlePlaceholder.id = "card" + task.id;
    titlePlaceholder.classList.add("pink");
    titlePlaceholder.classList.add("draggable");
    titlePlaceholder.style.cursor = "grab";
    titlePlaceholder.draggable = true;
    titlePlaceholder.ondragstart = onDragStart;
    tasksPlaceholder.appendChild(titlePlaceholder);
  });
}

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);

  event.currentTarget.style.backgroundColor = "#d0eb6c";
  event.currentTarget.style.cursor = "grab";
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);
  draggableElement.style.backgroundColor = "#4AAE9B";
  draggableElement.style.cursor = "grab";

  const dropzone = event.target;

  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}

addTaskButton.addEventListener('click', e =>{
    e.preventDefault()
    //Task desc koji dobivam od textArea-e i user cemo poslije zamijenit sa pravim userima 
    const taskDescription = textAreaDescription.value
    const user = 'Marin'
    //bodyData su parametri koji ulaze kao novi task, moras napravit objekt od njih i stringify-at
    //tako da ih u requestu dolje (*!*) može primit pa onda po tome dodajen u db
    const bodyData = JSON.stringify({
        description: taskDescription,
        user
    })
    addTask(bodyData)
})

async function addTask(taskData){
    fetch('/api/addTask', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        // *!*
        body: taskData
    }).then(async (res)=>{
        const result = await res.text()
        document.location.reload()
        console.log(result)
    })
}

getTasks();
