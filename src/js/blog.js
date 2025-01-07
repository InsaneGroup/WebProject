//declare variables
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const home2_content = $(".home2-content");
const leftBtn = $("#left");
const rightBtn = $("#right");
const home2_contentChild = $$(".home2-content-container");
const templateDot = $("#dot-template");
const dot_container = $(".dot-container");
const templateRecipe = $("#recipe-template");
const main_row = $$(".main-row");
const nav_tabs = $$(".nav-tab");
const recipe_category_template = $("#category-template");
const category = $(".category");
const category_section = $("#category-section");
const categoryName = JSON.parse(localStorage.getItem("categoryName")) || [];

const recipe_info = $("#recipe-info");

const category_container = $(".category-container");

const recipeName = JSON.parse(localStorage.getItem("recipeName")) || [];

const table_body = $("#table-body");
const table_row_template = $("#table-row-template");
const recipe_img_container = $(".recipe-img-container");
let imgRecipe, nameRecipe, areaRecipe, cateRecipe;

const recipe_content = $(".recipe-content");

const instruction_section = $("#instruction-section");
const instruction_container = $(".instruction-container");
const left_instruction = $("#left-instruction");
const right_instruction = $("#right-instruction");
const inputRecipe = $("#input-find");
const searchButton = $("#search-button");

const loginButton = $("#login-btn");
const userBtn = $("#user");
const logoutBtn = $('#log-out')
let loginState = JSON.parse(localStorage.getItem("loginState")) || false;

const scroll_to_top = $('.scroll-to-top')

const card_template = $('#card-template')
const post_container = $('#post-container')

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



nav_tabs.forEach((tab, index) => {
  localStorage.setItem("categoryName", JSON.stringify([]));
  localStorage.setItem("recipeName", JSON.stringify([" "]));
  localStorage.setItem("categoryNameHome", JSON.stringify([]));
  localStorage.setItem("recipeNameHome", JSON.stringify([" "]));

  tab.addEventListener("click", function () {
    $(".nav-tab.active").classList.remove("active");

    this.classList.add("active");
  });
});

function checkLogin() {
  if (loginState) {
    loginButton.classList.add("active");
    userBtn.classList.add("active");
  } else {
    loginButton.classList.remove("active");
    userBtn.classList.remove("active");
  }
}
checkLogin();

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






const posts = [
  {
    image: "../../assets/images/unique.webp",
    title: "Discover Unique Vegetarian Dishes",
    description: "Enjoy Creative Vegetarian Delights",
    link: "https://themodernproper.com/60-best-vegetarian-meals",
  },
  {
    image: "../../assets/images/pho.jpg",
    title: "How to Cook Authentic Pho",
    description:
      "Cook Restaurant-Style Pho at Home",
    link: "https://thewoksoflife.com/pho-vietnamese-noodle-soup/",
  },
  {
    image: "../../assets/images/easy_cook.jpg",
    title: "5 Easy Cooking Tips",
    description: "Useful Tips to Make Cooking Easier",
    link: "https://thurmontkountrykitchen.com/top-5-cooking-tips-for-beginners/",
  },
  {
    image: "../../assets/images/christine-ha.webp",
    title: "Ănthology series của Saigoneer",
    description:
      "Vietnamese cuisine worldwide journey",
    link: "https://saigoneer.com/vn/anthology/16910-t%E1%BB%AB-m%C3%B3n-%C4%83n-m%E1%BA%B9-n%E1%BA%A5u,-christine-h%C3%A0-vi%E1%BA%BFt-n%C3%AAn-nh%E1%BB%AFng-c%C3%A2u-chuy%E1%BB%87n-%E1%BA%A9m-th%E1%BB%B1c-m%E1%BB%9Bi",
  },
];



posts.forEach(post=>
{
  const card = card_template.content.cloneNode(true)
  card.querySelector('img').src = post.image
  card.querySelector('h3').innerText = post.title
  card.querySelector('p').innerText = post.description
  card.querySelector('a').href = post.link

  post_container.appendChild(card)

})





