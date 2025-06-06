const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const submenu = document.querySelector(".submenu");
const items = document.querySelectorAll(".item");
const mainBody = document.querySelector(".main-body");

function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    mainBody.classList.remove("opened-menu");

    // adds the menu (hamburger) icon
    toggle.querySelector("a").innerHTML = "<i class=’fas bars’>+</i>";
  } else {
    menu.classList.add("active");
    mainBody.classList.add("opened-menu");

    // adds the close (x) icon
    toggle.querySelector("a").innerHTML = "<u><i class=’fas bars’>-</i></u>";
  }
}

function toggleItem() {
  if (this.classList.contains(".submenu-active")) {
    this.classList.remove(".submenu-active");
    // this.classList.remove("submenu-open")
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    // this.classList.remove("submenu-open")
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
    // submenu.classList.remove("submenu-open")
  }
}

for (let item of items) {
  if (item.querySelectorAll(".item")) {
    item.addEventListener("click", toggleItem, false);
    item.addEventListener("keypress", toggleItem, false);
  }
}

function toggleSubmenu() {
  // menu.querySelector(".submenu").classList.add("submenu-open")

  if (submenu.classList.contains(".submenu")) {
    // this.classList.remove("submenu-open");
    menu.querySelector(".submenu").classList.remove("submenu-open");
    // menu.querySelector(".submenu").classList.add("submenu-open")
  } else if (submenu.querySelector("submenu-open")) {
    menu.querySelector(".submenu").classList.remove("submenu-open");
    // menu.querySelector(".submenu").classList.add(".submenu-open")
    submenu.classList.add("submenu-open");
  } else {
    // submenu.classList.remove("submenu-open")
    menu.querySelector(".submenu").classList.add("submenu-open");
    // menu.querySelector(".submenu").classList.remove("submenu-open")
  }
}

function closeDropDown(e) {}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  if (menu.querySelector(".submenu-active")) {
    let isClickInside = menu
      .querySelector(".submenu-active")
      .contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
      menu.querySelector(".submenu-active").classList.remove("submenu-active");
      menu.querySelector(".submenu").classList.remove("submenu-open");
    }
  }
}

function iClick() {
  alert("hello");
}

toggle.addEventListener("click", toggleMenu, false);
document.addEventListener("click", closeSubmenu, false);

// console.log(toggle)

// console.log(menu)

// console.log(submenu)

// console.log(items)
const container = document.querySelector(".image-container");
const container_items = container.querySelectorAll(".container-item");

const buttonsHTML = Array.from(container_items, () => {
  return '<span class="carousel-btn">+</span>';
});

container.insertAdjacentHTML(
  "beforeend",
  `<div class="carousel-nav"> ${buttonsHTML.join("")} </div> `
);

const buttons = container.querySelectorAll(".carousel-btn");

buttons.forEach((button, i) => {
  button.addEventListener("click", () => {
    container_items.forEach((image) =>
      image.classList.remove("image--selected")
    );
    buttons.forEach((button) =>
      button.classList.remove("carousel-btn--selected")
    );
    container_items[i].classList.add("image--selected");
    button.classList.add("carousel-btn--selected");
  });
});

// addEventListener("click", buttons);

console.log(buttonsHTML);
