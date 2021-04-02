const registrationForm = document.getElementById('registrationForm')
const usernameInput = document.getElementById('usernameInput')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passInput')
const submitRegistrationButton = document.getElementById('submitRegistrationButton')

//document.cookie = "username=John Doe; expires=Wed, 13 Aug 2070 12:00:00 UTC";


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
            document.cookie = `ms_tm_token=${makeToken(32)}; expires=Wed, 13 Aug 2070 12:00:00 UTC`
            window.location.href = '/mainpage'
        }
    })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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