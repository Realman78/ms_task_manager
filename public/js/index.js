const tasksDiv = document.getElementById('tasksDiv')

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