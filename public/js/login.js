const user_or_email_input = document.getElementById('user_or_email_input')
const passInput = document.getElementById('passInput')
const loginButton = document.getElementById('loginButton')
const loginForm = document.getElementById('loginForm')

async function checkIfLoggedIn(){
    try{
        const res = await fetch('/users/getUsers/token')
        const data = await res.json()
        if (data.length > 0){
            window.location.href = '/mainpage'
        }
    }catch(e){
        console.log('login')
    }
}
checkIfLoggedIn()

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
        const data = await res.json()
        updateToken(data.id, res.status)

    })
}

function updateToken(id,status){
    const token = makeToken(32)
    const body = JSON.stringify({token})
    fetch('/users/updateToken/'+id, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body
    }).then(res=>{
        redirectToMain(status, token)
    })
}

function redirectToMain(status, token){
    if(status == 201){
        document.cookie = `ms_tm_token=${token}; expires=Wed, 13 Aug 2070 12:00:00 UTC`
        window.location.href = '/mainpage'
    }else{
        alert('wrong username or pass')
    }
}

function makeToken(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}