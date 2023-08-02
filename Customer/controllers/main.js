let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
// let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

const products = [];
function fetchProductsAndDisplay() {
  // Replace 'your-api-url' with the actual URL of the API you want to fetch from.
  const apiUrl = "https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // 'data' contains the JSON response from the API.
      // Assuming the API response is an array of product objects.

      const productListDiv = document.getElementById("list");
      productListDiv.innerHTML = ""; // Clear previous content (if any).

      // Loop through each product and create an HTML element to display it.
      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.setAttribute("data-product-name", product.name);

        const nameElement = document.createElement("h2");
        nameElement.textContent = product.name;
        productDiv.appendChild(nameElement);

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: $${product.price}`;
        productDiv.appendChild(priceElement);

        const descElement = document.createElement("p");
        descElement.textContent = product.desc;
        productDiv.appendChild(descElement);

        const imgElement = document.createElement("img");
        imgElement.src = product.img;
        productDiv.appendChild(imgElement);

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn");

        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => {
          addToCart(product);
        });
        productDiv.appendChild(addToCartButton);

        productListDiv.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to display the products when the page loads.
fetchProductsAndDisplay();

const cartItems = [];

function addToCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  updateCartDisplay();
}

function removeFromCart(productId) {
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  updateCartDisplay();
}

function increaseQuantity(productId) {
  const item = cartItems.find((item) => item.id === productId);
  if (item) {
    item.quantity++;
  }
  updateCartDisplay();
}

function decreaseQuantity(productId) {
  const item = cartItems.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = ""; // Clear previous cart items

  const cartQuantityElement = document.getElementById("cartQuantity");
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartQuantityElement.textContent = `${totalQuantity}`;

  // Update the cart display with the items in the cart
  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} (Số lượng: ${item.quantity}) (Giá: $${
      item.price * item.quantity
    })`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });
    listItem.appendChild(removeButton);

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      increaseQuantity(item.id);
    });
    listItem.appendChild(increaseButton);

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(item.id);
    });
    listItem.appendChild(decreaseButton);

    cartList.appendChild(listItem);
  });
}

function displayProductsByName(productName) {
  const menuItems = document.querySelectorAll(".list .product");

  menuItems.forEach((item) => {
    const productNameAttribute = item.getAttribute("data-product-name");

    if (productName === "All" || productName === productNameAttribute) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

const selectPhone = document.getElementById("selectPhone");
selectPhone.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log(selectedValue); // Xem giá trị đã chọn trong console để kiểm tra
  displayProductsByName(selectedValue);
});

window.onload = () => {
  // Ban đầu, hiển thị tất cả sản phẩm
  displayProductsByName("All");
};
