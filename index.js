const API_URL = "https://fakestoreapi.com/products";
const category = "electronics";
const productList = document.querySelector(".product-list");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function fetchLaptops() {
    const url = `${API_URL}/category/${category}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayLaptops(data))
        .catch((error) => console.error("Error fetching laptops:", error));
}
function displayLaptops(laptops) {
    productList.innerHTML = "";
    laptops.forEach((laptop) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <h3>${laptop.title}</h3>
            <img src="${laptop.image}" alt="${laptop.title}" style="max-width: 150px;">
            <p>Giá: ${laptop.price * 10000} VND </p>
            <button class="btn add-to-cart">Add to cart</button>
        `;

        productList.appendChild(productDiv);
    });
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const parent = button.parentElement;
            const product = {
                name: parent.querySelector("h3").innerText,
                price: parseFloat(parent.querySelector("p").innerText.replace(/[^\d.]/g, "")),
                quantity: 1,
            };

            const existingProduct = cart.find((item) => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        });
    });
}
// Kiểm tra trạng thái đăng nhập
const userStatus = document.getElementById('user-status');
const loggedInUser = localStorage.getItem('loggedInUser');

if (loggedInUser) {
    userStatus.innerHTML = `${loggedInUser} <button id="logout-btn">Đăng xuất</button>`;
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    });
} else {
    userStatus.innerHTML = '<a href="login.html">Đăng nhập</a>';
}

document.addEventListener("DOMContentLoaded", fetchLaptops);