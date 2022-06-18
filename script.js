let cartDropdown = document.querySelector(".header__cart-dropdown");
let btnCart = document.querySelector(".header__cart");

btnCart.addEventListener("click", toggleCartDropdown);
function toggleCartDropdown() {
  cartDropdown.classList.toggle("active");
}
