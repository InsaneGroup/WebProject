const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const loginButton = $('#login-btn')
const userBtn = $('#user')
const scroll_to_top = $('.scroll-to-top')
let loginState = JSON.parse(localStorage.getItem('loginState')) || false
const logoutBtn = $('#log-out')
const logoutBtn2 = $('#user-logout')
const favorite_container = $('.favorite-container')
const favorites = JSON.parse(localStorage.getItem('favorites')) || []
const recipeName = JSON.parse(localStorage.getItem('recipeName')) || []
const recipe_info = $('#recipe-info')
const categoryName = JSON.parse(localStorage.getItem("categoryName")) || []
window.addEventListener('scroll', ()=>
    {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
        {
            scroll_to_top.style.display = 'flex'
        }else 
        {
            scroll_to_top.style.display = 'none'
        }
    })
    
    scroll_to_top.addEventListener('click', ()=>
    {
        window.scroll({
            top: 0,
            scrollBehavior: 'smooth'
        })
    })
    

function checkLogin()
{
        if(loginState)
        {
            loginButton.classList.add('active')
            userBtn.classList.add('active')
        }else
        {
            loginButton.classList.remove('active')
            userBtn.classList.remove('active')
        }
}
checkLogin()

if(logoutBtn)
    {
        logoutBtn.addEventListener('click', ()=>
        {
           if(confirm('Log out?'))
           {
                localStorage.setItem('loginState', JSON.stringify(loginState=false))
                checkLogin()
                localStorage.clear();
                window.location.href = '../../index.html'

           }
        })
    }
if(logoutBtn2)
    {
        logoutBtn2.addEventListener('click', ()=>
        {
           if(confirm('Log out?'))
           {
                localStorage.setItem('loginState', JSON.stringify(loginState=false))
                checkLogin()
                localStorage.clear();
                window.location.href = '../../index.html'
           }
        })
    }


    console.log(favorite_container);
    
async function showRecipe(name = "")
{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const data = await response.json()

    const obj = data.meals[0]
    
    const recipe = recipe_info.content.cloneNode(true);
    recipe.querySelector('img').src = obj.strMealThumb;
    recipe.querySelector('p').innerText = obj.strCategory;
    recipe.querySelector('h3').innerText = obj.strMeal;
    favorite_container.appendChild(recipe)
    
}


async function loadFavoriteRecipes() 
{
    if (favorites) 
    {
        for (const f of favorites) 
        {
            await showRecipe(f); 
        }
       
        for(const obj of favorite_container.querySelectorAll('.recipe-info-container'))
        {
            obj.addEventListener('click', function()
            {
                console.log('clicked');
                
                if(recipeName)
                {
                    if(recipeName.length === 0)
                    {
                        recipeName.push(this.querySelector('h3').innerText)
                        categoryName.push(this.querySelector('p').innerText)
                       
                    }else
                    {
                        recipeName.splice(0, 1)
                        categoryName.splice(0,1)
                        recipeName.push(this.querySelector('h3').innerText) 
                        categoryName.push(this.querySelector('p').innerText) 
                    }

                }
                localStorage.setItem('recipeName', JSON.stringify(recipeName))
                localStorage.setItem('categoryName', JSON.stringify(categoryName))
                window.location.href = '../html/recipe_info.html'
            })


        }
    }
}

loadFavoriteRecipes();






