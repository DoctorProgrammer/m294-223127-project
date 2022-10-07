document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginFormData = new FormData(loginForm);
        fetch("http://localhost:3000/auth/cookie/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({email: loginFormData.get('email'), password: loginFormData.get('password')})
            }).then((response) => {
                if(response.status < 300) {
                    window.location.href = "./index.html";
                }
            })
    });
});