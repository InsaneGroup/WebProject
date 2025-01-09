const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const signUpButton = $('#signUp');
const signInButton = $('#signIn');
const container = $('#container');
const toast_container = $('.toast-container')
const submitSignIn = $('#submit-sign-in')
const inputEmail = $('#sign-in-email')
const inputPassword = $('#sign-in-password')

let loginState = JSON.parse(localStorage.getItem('loginState')) || false

const user = {
	userEmail: "useremail@gmail.com",
	userName: "userVipPro",
	password: "user123"
}



if(signUpButton)
{
	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});
}

if(signInButton)
{
	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});
}


if(submitSignIn)
{
	submitSignIn.addEventListener('click', ()=>
	{
		if(inputEmail.value === "" || inputPassword.value === "")
		{
			localStorage.setItem('loginState', JSON.stringify(loginState=false))
			toastInform('Please enter your email and password!')
		}else
		{
			if(inputEmail.value === user.userEmail)
				{
					if(inputPassword.value === user.password)
					{
						localStorage.setItem('loginState', JSON.stringify(loginState=true))
						window.location.href = '../../index.html'
						// toastInform('Login successfully')
						alert('Success')
					}else
					{
						localStorage.setItem('loginState', JSON.stringify(loginState=false))
						toastInform('Wrong password')
					}
				}else
				{
					localStorage.setItem('loginState', JSON.stringify(loginState=false))
					toastInform('Wrong email')
				}
		}

	})
}

function toastInform(text)
{
    const div = document.createElement("div");
    div.classList.add("toast");
    div.innerText = text;
    toast_container.appendChild(div);
    setTimeout(()=>
        {
            div.remove();
        },2000)
}