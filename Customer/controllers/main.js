let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
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
  // Thay thế 'your-api-url' bằng URL thực tế của API mà bạn muốn lấy dữ liệu từ.

  const apiUrl = "https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // 'data' chứa phản hồi JSON từ API.
      // Giả sử phản hồi từ API là một mảng các đối tượng sản phẩm.
      const productListDiv = document.getElementById("list");
      productListDiv.innerHTML = ""; // Xóa nội dung trước đó (nếu có).

      // Duyệt qua từng sản phẩm và tạo một phần tử HTML để hiển thị nó.

      data.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const nameElement = document.createElement("h2");
        nameElement.textContent = product.name;
        productDiv.appendChild(nameElement);

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: $${product.price}`;
        productDiv.appendChild(priceElement);

        const imgElement = document.createElement("img");
        imgElement.src = product.img;
        productDiv.appendChild(imgElement);

        const addToCartButton = document.createElement("button");
        document.createElement("button");
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

// Gọi hàm để hiển thị các sản phẩm khi trang được tải.

fetchProductsAndDisplay();

const cartItems = loadCartItemsFromLocalStorage();

function addToCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  updateCartDisplay();
  saveCartItemsToLocalStorage();
}

function removeFromCart(productId) {
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  updateCartDisplay();
  saveCartItemsToLocalStorage();
}

function increaseQuantity(productId) {
  const item = cartItems.find((item) => item.id === productId);
  if (item) {
    item.quantity++;
  }
  updateCartDisplay();
  saveCartItemsToLocalStorage();
}

function decreaseQuantity(productId) {
  const item = cartItems.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
  }
  updateCartDisplay();
  saveCartItemsToLocalStorage();
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
    removeButton.classList.add("btn-remove");
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

// Hàm select product để kiểm tra option
function SelectProduct() {
  const productSelect = document.getElementById("type");
  const selectedProduct = [];

  for (let i = 0; i < productSelect.length; i++) {
    if (productSelect[i].checked) {
      selectedProduct.push(productSelect[i].value);
    }
  }
  console.log(selectedProduct);
  fetchProductsAndDisplay(selectedProduct);
}

// Hàm để xử lý sự kiện khi chọn option trong select
function onProductSelectChange() {
  const productSelect = document.getElementById("productSelect");
  const selectedProduct = productSelect.value;

  if (selectedProduct === "Iphone") {
    // Xuất ra sản phẩm của iPhone
    apiGetProducts(selectedProduct)
      .then((response) => {
        fetchProductsAndDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (selectedProduct === "Samsung") {
    // Xuất ra sản phẩm của Samsung
    apiGetProducts(selectedProduct)
      .then((response) => {
        fetchProductsAndDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Xuất ra tất cả sản phẩm
    fetchProductsAndDisplay();
  }
}

// Gán sự kiện onchange cho select
const productSelect = document.getElementById("productSelect");
productSelect.addEventListener("change", onProductSelectChange);

const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
  checkout();
});

function checkout() {
  if (cartItems.length === 0) {
    // Show a pop-up for failed payment
    showPaymentStatus("Thanh toán thất bại vì giỏ hàng của bạn trống!");
    return;
  }

  // You can add the payment processing logic here.
  // For the purpose of this example, let's assume the payment is successful.
  // You can replace the following setTimeout with actual payment processing logic.
  setTimeout(() => {
    // Clear the cart after successful payment
    cartItems.length = 0;
    updateCartDisplay();
    // Show a pop-up for successful payment
    showPaymentStatus("Thanh toán thành công!");
  }, 1000); // Delay for 2 seconds to simulate payment processing
}

function showPaymentStatus(message) {
  const paymentModal = document.getElementById("paymentModal");
  const paymentStatus = document.getElementById("paymentStatus");
  paymentStatus.textContent = message;
  paymentModal.style.display = "block";

  const closeModalButton = document.querySelector(".closeModal");
  closeModalButton.addEventListener("click", () => {
    paymentModal.style.display = "none";
  });

  // Hide the modal after 3 seconds
  setTimeout(() => {
    paymentModal.style.display = "none";
  }, 2000);
}

function saveCartItemsToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartItemsFromLocalStorage() {
  const storedItems = localStorage.getItem("cartItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

window.onload = () => {
  updateCartDisplay();
  fetchProductsAndDisplay();
};
