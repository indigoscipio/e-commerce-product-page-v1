//Dom Elements
let btnPlus = document.querySelector(".plus");
let btnMinus = document.querySelector(".minus");
let btnCart = document.querySelector(".header__cart");
let btnAddToCart = document.querySelector(".button-add-to-cart");
let btnCheckout = document.querySelector("#btn-checkout");
let body = document.querySelector("body");
let cartDropdown = document.querySelector(".header__cart-dropdown");
let cartNotification = document.querySelector(".notification");
let dropdownProduct = document.querySelector(".dropdown__product");
let menuContent = document.querySelector(".header__menu");
let hamburgerMenu = document.querySelector(".header__hamburger");
let quantityDisplay = document.querySelector("#quantity");
let priceOriginalEl = document.querySelector(".price__original");
let priceCurrEl = document.querySelector(".price__current");
let images = document.querySelectorAll(".image-container img");

//Desktop thumbnails
// let thumbnailContainer = document.querySelector(".thumbnail-container");
let thumbnailRadioInput = document.querySelectorAll(".input-radio");
let thumbnails = document.querySelectorAll(".thumbnail");

//DOM Elements - Slider
let btnSliderPrev = document.querySelector(".arrow.left");
let btnSliderNext = document.querySelector(".arrow.right");
let imageContainer = document.querySelector(".image-container");

//Variables
let priceCurr = 125;
let priceOriginal = 250;
let quantity = 1;
let slideIdx = 0;

//Event Listeners
btnMinus.addEventListener("click", decreaseQuantity);
btnPlus.addEventListener("click", increaseQuantity);
btnAddToCart.addEventListener("click", updateCart);
hamburgerMenu.addEventListener("click", toggleMenu);
btnSliderNext.addEventListener("click", slideNext);
btnSliderPrev.addEventListener("click", slidePrev);

//Functions
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    console.log(thumbnail.previousElementSibling.dataset.index);
  });
});

function slideNext() {
  slideIdx++;

  if (slideIdx > images.length - 1) {
    slideIdx = 0;
  }
  imageContainer.style.transform = `translateX(${-100 * slideIdx}%)`;
}

function slidePrev() {
  if (slideIdx === 0) {
    slideIdx = images.length;
  }

  slideIdx--;
  imageContainer.style.transform = `translateX(${-100 * slideIdx}%)`;
}

function toggleMenu() {
  hamburgerMenu.classList.toggle("active");
  menuContent.classList.toggle("active");
  body.classList.toggle("locked");
}

function updateCart() {
  alert("Your product has been added to your cart.");

  //update the notification
  cartNotification.style.display = "block";
  cartNotification.innerText = quantity;

  //update the dropdown info & remove default empty content
  document.querySelector(".dropdown__empty").style.display = "none";
  dropdownProduct.innerHTML = `
  <div class="product-thumbnail">
    <img src="images/image-product-1-thumbnail.jpg" alt="" />
  </div>
  <p class="product-title">Autumn Limited Edition...</p>
  <p class="product-price">$${priceCurr}.00 x ${quantity} <b>$${
    priceCurr * quantity
  }.00 </b></p>
  <div class="delete" id="button-delete">
    <img src="images/icon-delete.svg" alt="" />
  </div>
`;

  let btnDelete = document.getElementById("button-delete");

  //check if there's a delete button
  if (btnDelete) {
    btnDelete.addEventListener("click", emptyCart);

    function emptyCart() {
      dropdownProduct.innerHTML = "";
      document.querySelector(".dropdown__empty").style.display = "block";
      cartNotification.style.display = "none";
      btnCheckout.style.display = "none";
    }
  }

  //display the checkout button
  btnCheckout.style.display = "block";
}

function increaseQuantity() {
  quantity++;
  updatePriceDOM();
}

function decreaseQuantity() {
  quantity--;

  if (quantity < 1) {
    quantity = 1;
  }

  updatePriceDOM();
}

function updatePriceDOM() {
  priceCurrEl.innerText = "";
  priceOriginalEl.innerText = "";

  priceCurrEl.innerText += `$${125 * quantity}.00`;
  priceOriginalEl.innerText += `$${250 * quantity}.00`;
  quantityDisplay.value = +quantity;
}

btnCart.addEventListener("click", toggleCartDropdown);
function toggleCartDropdown() {
  cartDropdown.classList.toggle("active");
}
