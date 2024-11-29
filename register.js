// register.js

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    // Lưu thông tin tài khoản vào localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        alert('Tên đăng nhập đã tồn tại!');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công! Hãy đăng nhập.');
    window.location.href = 'login.html';
});
