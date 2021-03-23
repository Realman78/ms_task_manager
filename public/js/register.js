const registrationForm = document.getElementById('registrationForm')
const usernameInput = document.getElementById('usernameInput')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passInput')
const submitRegistrationButton = document.getElementById('submitRegistrationButton')

registrationForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    if (validateEmail(email)){
        registerUser(username, email, password)
    }else{
        alert('Incorrect email')
    }
    
})

function registerUser(username, email, password){
    const bodyData = JSON.stringify({
        username, email, password
    })
    fetch('/users/register', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(async (res)=>{
        if(res.status == 201){
            window.location.href = '/mainpage'
        }
    })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}