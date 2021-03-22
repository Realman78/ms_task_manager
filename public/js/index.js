const tasksDiv = document.getElementById('tasksDiv')
const textAreaDescription = document.getElementById('textAreaDescription')
const addTaskButton = document.getElementById('addTaskButton')

addTaskButton.addEventListener('click', e =>{
    e.preventDefault()
    const taskDescription = textAreaDescription.value
    const user = 'Marin'
    const bodyData = JSON.stringify({
        description: taskDescription,
        user
    })
    fetch('/api/addTask', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(async (res)=>{
        const result = await res.text()
        console.log(result)
    })
})

async function getTasks(){
    const data =  await fetch('/api/getTasks').then(async (res)=>{
        const rows = await res.json()
        return rows
    })
    showTasks(data)
}

function showTasks(data){
    data.forEach(task => {
        //imas description, user, completed, id pa sad pomocu js-a ubaci
        const titlePlaceholder = document.createElement('h2')
        titlePlaceholder.textContent = task.description
        tasksDiv.appendChild(titlePlaceholder)
    });
}

getTasks()