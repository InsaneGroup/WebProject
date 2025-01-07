

//declare variables
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const recipe_category_template = $('#category-template')
const category = $('.category')
const category_section = $('#category-section')
const categoryName = JSON.parse(localStorage.getItem("categoryName")) || []


const recipe_info = $('#recipe-info')

const category_container = $('.category-container')

const recipeName = JSON.parse(localStorage.getItem('recipeName')) || []


const table_body = $('#table-body')
const table_row_template = $('#table-row-template')
const recipe_img_container = $('.recipe-img-container')
let imgRecipe, nameRecipe, areaRecipe, cateRecipe

const recipe_content = $('.recipe-content')

const instruction_section = $('#instruction-section')
const instruction_container = $('.instruction-container')
const left_instruction = $('#left-instruction')
const right_instruction = $('#right-instruction')
const inputRecipe = $('#input-find')
const searchButton = $('#search-button')

const loginButton = $('#login-btn')
const userBtn = $('#user')
let loginState = JSON.parse(localStorage.getItem('loginState')) || false

let searchValue = JSON.parse(localStorage.getItem('searchValue')) || ""

console.log(searchValue);
const logo_title = $('#logo-title')
const logoutBtn = $('#log-out')

const scroll_to_top = $('.scroll-to-top')

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



logo_title.addEventListener('click', ()=>
{
    window.location.href = '../../index.html'
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

document.body.addEventListener('keydown', ()=>
{
    inputRecipe.focus()
})




if(inputRecipe)
{
    inputRecipe.addEventListener('keydown', (e)=>
        {
            if(e.key === 'Enter')
            {
                if(inputRecipe.value != '')
                {
                    localStorage.setItem('searchValue', JSON.stringify(inputRecipe.value))
                    searchValue = JSON.parse(localStorage.getItem('searchValue'))
                    category_container.replaceChildren()
                    if(searchValue.length === 1)
                    {
                        showRecipeFirstLetter(searchValue)
                    }else showRecipe(searchValue)
                }
            }
        })        
}

if(searchButton)
{
    searchButton.addEventListener('click', ()=>
    {
        if(inputRecipe && inputRecipe.value != '')
        {
            localStorage.setItem('searchValue', JSON.stringify(inputRecipe.value))
            searchValue = JSON.parse(localStorage.getItem('searchValue'))
            category_container.replaceChildren()
            if(searchValue.length === 1)
            {
                showRecipeFirstLetter(searchValue)
            }else showRecipe(searchValue)
        }
    })
}



//show recipe
async function showRecipe(inputValue)
{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + inputValue)
    const data = await response.json()
    
    if(data.meals === null)
    {
        const inform = document.createElement('div')
        inform.classList.add('not-found');
        inform.innerHTML = `
                <h2>Oops! We couldn’t find what you were looking for</h2>
                <p>Try searching for something else</p>
        `
        category_container.replaceChildren()
        category_container.appendChild(inform)

        inform.querySelector('p').addEventListener('mouseover', ()=>
        {
            inform.querySelector('p').style.cursor = 'pointer'
        })
        inform.querySelector('p').addEventListener('click', ()=>
        {
            inputRecipe.focus()
            window.location.href = '#recipe1'
        })
    }

   if(data.meals)
   {
        for(const obj of data.meals)
        {
            if(obj)
            {
                 const recipe = recipe_info.content.cloneNode(true)
                 recipe.querySelector('img').src = obj.strMealThumb
                 recipe.querySelector('p').innerText = obj.strCategory
                 recipe.querySelector('h3').innerText = obj.strMeal
                 category_container.appendChild(recipe)
            }
        }
   }

   for(const obj of category_container.querySelectorAll('.recipe-info-container'))
    {
         obj.addEventListener('click', function()
         {
             if(recipeName)
             {
                 if(recipeName.length === 0)
                 {
                     recipeName.push(this.querySelector('h3').innerText)
                 }else
                 {
                     recipeName.splice(0, 1)
                     recipeName.push(this.querySelector('h3').innerText)
                 }
             }

             if(categoryName)
             {
                    if(categoryName.length === 0)
                    {
                        categoryName.push(this.querySelector('p').innerText)
                    }else
                    {
                        categoryName.splice(0, 1)
                        categoryName.push(this.querySelector('p').innerText)
                    }
             }
                 
             localStorage.setItem('recipeName', JSON.stringify(recipeName))
             localStorage.setItem('categoryName', JSON.stringify(categoryName))
             window.location.href = '../html/recipe_info.html'
             // console.log(recipeName);
         })
    }
    
}




async function showRecipeFirstLetter(inputValue)
{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=' + inputValue)
    const data = await response.json()
    
    if(data.meals === null)
    {
        const inform = document.createElement('h2')
        inform.innerText = 'Not Found'
        category_container.replaceChildren()
        category_container.appendChild(inform)
    }

   if(data.meals)
   {
        for(const obj of data.meals)
        {
            if(obj)
            {
                 const recipe = recipe_info.content.cloneNode(true)
                 recipe.querySelector('img').src = obj.strMealThumb
                 recipe.querySelector('p').innerText = obj.strCategory
                 recipe.querySelector('h3').innerText = obj.strMeal
                 category_container.appendChild(recipe)
            }
        }
   }


   for(const obj of category_container.querySelectorAll('.recipe-info-container'))
    {
         obj.addEventListener('click', function()
         {
             if(recipeName)
             {
                 if(recipeName.length === 0)
                 {
                     recipeName.push(this.querySelector('h3').innerText)
                 }else
                 {
                     recipeName.splice(0, 1)
                     recipeName.push(this.querySelector('h3').innerText)
                 }
             }

             if(categoryName)
             {
                    if(categoryName.length === 0)
                    {
                        categoryName.push(this.querySelector('p').innerText)
                    }else
                    {
                        categoryName.splice(0, 1)
                        categoryName.push(this.querySelector('p').innerText)
                    }
             }
                 
             localStorage.setItem('recipeName', JSON.stringify(recipeName))
             localStorage.setItem('categoryName', JSON.stringify(categoryName))
             window.location.href = '../html/recipe_info.html'
             // console.log(recipeName);
         })
    }
    
}



if(searchValue.length === 1)
{
    showRecipeFirstLetter(searchValue)
}else showRecipe(searchValue)



























