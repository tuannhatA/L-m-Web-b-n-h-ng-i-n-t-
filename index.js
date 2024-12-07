let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = {
            name: button.parentElement.querySelector('h3').innerText,
            price: parseInt(button.parentElement.querySelector('p').innerText.replace(/[^\d]/g, '')),
            quantity: 1
        };

        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm vào giỏ hàng!');
    });
});
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

fetch('https://fakestoreapi.com/products/category/electronics')
    .then(res => res.json())
    .then(json => console.log(json))

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");

    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products/category/electronics")
        .then((response) => response.json())
        .then((products) => {
            // Loop through all products and display them
            products.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                        <h3>${product.title}</h3>
                        <img src="${product.image}" alt="${product.title}" style="max-width: 150px;">
                        <p>Giá: ${product.price} USD</p>
                        <button class="btn add-to-cart">Thêm vào giỏ</button>
                    `;

                productList.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error("Failed to fetch products:", error);
            productList.innerHTML = "<p>Could not load products.</p>";
        });
});

