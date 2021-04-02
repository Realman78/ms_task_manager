const tasksDiv = document.getElementById('tasksDiv')
const textAreaDescription = document.getElementById('textAreaDescription')
const addTaskButton = document.getElementById('addTaskButton')
const logoutButton = document.getElementById('logoutButton')

async function checkIfLoggedIn(){
    try{
        const res = await fetch('/users/getUsers/token')
        const data = await res.json()
        console.log(data)
    }catch(e){
        window.location.href = '/login'
    }
}
checkIfLoggedIn()

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

logoutButton.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log(e.target)
})

async function updateTask(id, bodyData){
    fetch('/tasks/update/'+id, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(async (res)=>{
        const result = await res.text()
        document.location.reload()
        console.log(result)
    })
}

async function getTasks(){
    const data =  await fetch('/tasks/getall').then(async (res)=>{
        const rows = await res.json()
        return rows
    })
    showTasks(data)
}

async function addTask(taskData){
    fetch('/tasks/add', {
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