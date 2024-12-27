
//declare variables
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const home2_content = $('.home2-content')
const leftBtn = $('#left')
const rightBtn = $('#right')
const home2_contentChild = $$('.home2-content-container')
const templateDot = $('#dot-template')
const dot_container = $('.dot-container')
const templateRecipe = $('#recipe-template')
const main_row = $$('.main-row')
const nav_tabs = $$('.nav-tab')
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


nav_tabs.forEach((tab, index) => {

    localStorage.setItem('categoryName', JSON.stringify([]))
    localStorage.setItem('recipeName', JSON.stringify([" "]))
    localStorage.setItem('categoryNameHome', JSON.stringify([]))
    localStorage.setItem('recipeNameHome', JSON.stringify([" "]))


    tab.addEventListener('click', function () {
        $('.nav-tab.active').classList.remove('active')

        this.classList.add('active')
    })
})

function checkLogin() {
    if (loginState) {
        loginButton.classList.add('active')
        userBtn.classList.add('active')
    } else {
        loginButton.classList.remove('active')
        userBtn.classList.remove('active')
    }
}
checkLogin()


if (userBtn) {
    userBtn.addEventListener('click', () => {
        if (confirm('Log out?')) {
            localStorage.setItem('loginState', JSON.stringify(loginState = false))
            checkLogin()
        }
    })
}

document.querySelector('.contact-form form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('.contact-form input[type="email"]').value.trim();
    const name = document.querySelector('.contact-form input[type="text"]').value.trim();
    const message = document.querySelector('.contact-form textarea').value.trim();

    if (!email || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!message) {
        alert("Please enter your message.");
        return;
    }

    alert("Thank you for reaching out! We will get back to you soon.");
    e.target.reset();
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const subscribeButton = document.querySelector('.top-content .part:last-child .form a');
subscribeButton.addEventListener('click', function () {
    const name = document.querySelector('.top-content .part:last-child .form input[placeholder="Name"]').value.trim();
    const email = document.querySelector('.top-content .part:last-child .form input[placeholder="Email"]').value.trim();

    if (!name || !email || !validateEmail(email)) {
        alert("Please provide valid name and email.");
        return;
    }

    alert(`Thank you, ${name}, for subscribing to our newsletter!`);
});

const socialIcons = document.querySelectorAll('.social-icons a, .icon-container .icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.color = 'orange';
        icon.style.transform = 'scale(1.2)';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.color = '';
        icon.style.transform = 'scale(1)';
    });
});
