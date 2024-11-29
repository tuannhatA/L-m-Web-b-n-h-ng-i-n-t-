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
