

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

const recipeNameHome = JSON.parse(localStorage.getItem('recipeNameHome')) || []
const categoryNameHome = JSON.parse(localStorage.getItem('categoryNameHome')) || []

// console.log("categoryName: " + categoryName);
// console.log("recipeName: " + recipeName);
// console.log("recipeNameHome: " + recipeNameHome);

const loginButton = $('#login-btn')
const userBtn = $('#user')
let loginState = JSON.parse(localStorage.getItem('loginState')) || false
const logoutBtn = $('#log-out')
const logo_title = $('#logo-title')
const scroll_to_top = $('.scroll-to-top')

const heart = $('#heart')
const toast_container = $('.toast-container')
const label_heart = $('#label-heart')
const favorites = JSON.parse(localStorage.getItem('favorites')) || []



if(favorites)
    {
        favorites.forEach(f =>
            {
                if(JSON.stringify(f) === JSON.stringify(recipeName)) 
                {
                    if(label_heart)
                    {
                        label_heart.classList.add('active')
                    }
                }
            }
            )
    }

    if(heart)
        {
            heart.addEventListener('change', ()=>
                {
                    if(loginState)
                    {
                        if(heart.checked)
                            {
                                const exists = favorites.some(f => JSON.stringify(f) === JSON.stringify(recipeName));
                                if(exists) 
                                {
                                    toastInform("Recipe is already in your favorites!");
                                    return;
                                }
                                favorites.push(recipeName)
                                localStorage.setItem('favorites', JSON.stringify(favorites))
                                label_heart.classList.add('active')
                                toastInform("Recipe successfully added!")
                            }else
                            {
                                const index = favorites.findIndex(f => JSON.stringify(f) === JSON.stringify(recipeName));
                                if (index !== -1) 
                                {
                                    favorites.splice(index, 1); 
                                    localStorage.setItem('favorites', JSON.stringify(favorites));
                                    label_heart.classList.remove('active');
                                    toastInform("Recipe successfully removed!");
                                } 
                            }
                    }else toastInform('To proceed, kindly sign in to your account')
                    
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



logo_title.addEventListener('click', ()=>
{
     window.location.href = '../../index.html'
})


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




if(recipe_content)
{
    nameRecipe = recipe_content.querySelector('#name')
    areaRecipe = recipe_content.querySelector('#area')
    cateRecipe = recipe_content.querySelector('#cate')
}

if(recipe_img_container)
{
    imgRecipe = recipe_img_container.querySelector('img')
}

function clearRecipeName()
{
    localStorage.setItem('recipeNameHome', JSON.stringify([" "]))
}


if(category_section)
{
    const title1 = category_section.querySelector('#title')
    const title2 = category_section.querySelector('#title2')
    const backBtn = category_section.querySelector('#back-btn')
    const bread1 = category_section.querySelector('#bread1')
    const obj = [title1, backBtn, bread1]

    obj.forEach(ob =>
    {
        ob.addEventListener('click', ()=>
        {
            clearRecipeName()
        })
    })
        
    title1.innerText = categoryNameHome[0]
    title2.innerText = recipeNameHome[0]
}



function convertYouTubeURL(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' && urlObj.searchParams.has('v')) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
    }
    return url;
}

async function showRecipeInfo() 
{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + recipeNameHome[0])
    const data = await response.json()

    const meals = data.meals[0]
    imgRecipe.src = meals.strMealThumb
    nameRecipe.innerText = meals.strMeal
    areaRecipe.innerHTML = `<ion-icon name="location"></ion-icon> ${meals.strArea}`
    cateRecipe.innerHTML = `<ion-icon name="fast-food"></ion-icon> ${meals.strCategory}`
    for(let i=1; i<=20; i++)
    {
        const tableRow = table_row_template.content.cloneNode(true).firstElementChild
        if(meals[`strIngredient${i}`].length === 0)
        {
            continue
        }
        tableRow.querySelector('#left-column').innerText = meals[`strIngredient${i}`].replace(/\b\w/g, char => char.toUpperCase())
        tableRow.querySelector('#right-column').innerText = meals[`strMeasure${i}`]

        if(table_body)
        {
            table_body.appendChild(tableRow)
        }
    }

    if(left_instruction)
    {
        left_instruction.querySelector('iframe').src = convertYouTubeURL(meals.strYoutube) 
        left_instruction.querySelector('a').href = meals.strSource
    }

    if(right_instruction)
    {
        right_instruction.querySelector('p').innerText = meals.strInstructions
        console.log(meals.strInstructions);
    }
    
}

showRecipeInfo()





async function searchMealArea(mealName)
{
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + mealName)
    const data = await response.json()
    return data.meals[0].strArea
}

async function getFlag(country)
{
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags')
    const data = await response.json()
    for(const obj of data)
    {

       if(obj.name.common.toLowerCase() === country.toLowerCase())
       {
            console.log('hehe');
            
       }

        
    }
}



function setNormalToHome()
{
    localStorage.setItem('categoryName', JSON.stringify(categoryNameHome))
}



