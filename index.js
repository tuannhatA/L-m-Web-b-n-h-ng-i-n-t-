let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.name} - ${item.price} Đ`;
        cartItems.appendChild(li);
        total += item.price;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    }

    document.getElementById("total").innerText = `Tổng cộng: ${total} Đ`;
}
