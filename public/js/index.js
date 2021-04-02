const tasksDiv = document.getElementById("tasksDiv");

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

getTasks();
