const tasksDiv = document.getElementById('tasksDiv')
const textAreaDescription = document.getElementById('textAreaDescription')
const addTaskButton = document.getElementById('addTaskButton')

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

async function getTasks(){
    const data =  await fetch('/api/getTasks').then(async (res)=>{
        const rows = await res.json()
        return rows
    })
    showTasks(data)
}

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

function showTasks(data){
    data.forEach(task => {
        //imas description, user, completed, id pa sad pomocu js-a ubaci
        const titlePlaceholder = document.createElement('h2')
        titlePlaceholder.textContent = task.description
        tasksDiv.appendChild(titlePlaceholder)
    });
}

getTasks()