let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td>${itemTotal.toLocaleString()} VND</td>
            <td><button data-index="${index}" class="remove-btn">Xóa</button></td>
        `;
        cartItems.appendChild(row);
    });

    cartTotal.innerText = total.toLocaleString() + ' VND';

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            cart.splice(button.dataset.index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
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

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
    } else {
        if (loggedInUser){
            alert('Cảm ơn bạn đã mua hàng!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
        else {
            alert('Bạn cần đăng nhập trước khi mua hàng!');
        }
    }
});

updateCart();
