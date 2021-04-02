const user_or_email_input = document.getElementById('user_or_email_input')
const passInput = document.getElementById('passInput')
const loginButton = document.getElementById('loginButton')
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const username_or_email = user_or_email_input.value
    const password = passInput.value
    const bodyData = JSON.stringify({
        uoe: username_or_email, 
        password
    })
    userLogin(bodyData)
})
//Request za login usera
function userLogin(bodyData){
    fetch('/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(async (res)=>{
        if(res.status == 201){
            window.location.href = '/mainpage'
        }else{
            alert('wrong username or pass')
        }
    })
}