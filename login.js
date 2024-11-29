// login.js

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Kiểm tra thông tin đăng nhập
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert(`Chào mừng ${username}!`);
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
});
