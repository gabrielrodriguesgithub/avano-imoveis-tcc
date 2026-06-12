function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logout');
    const message = document.getElementById('message');
    const userList = document.getElementById('user-list');

    const loginDiv = document.getElementById('login');
    const dashboardDiv = document.getElementById('dashboard');
    const registerDiv = document.getElementById('registerContainer');
    const resetDiv = document.getElementById('resetContainer');
    const homeDiv = document.getElementById('home');
    const retornarHomeDiv = document.getElementById('retornarHome');

    function showDashboard() {
        if (loginDiv) loginDiv.style.display = 'none';
        if (dashboardDiv) dashboardDiv.style.display = 'block';
        if (registerDiv) registerDiv.style.display = 'none';
        if (resetDiv) resetDiv.style.display = 'none';
        if (homeDiv) homeDiv.style.display = 'none';
        if (retornarHomeDiv) retornarHomeDiv.style.display = 'block';
        fetchDashboardUsers();
    }

    function showLogin() {
        if (loginDiv) loginDiv.style.display = 'block';
        if (dashboardDiv) dashboardDiv.style.display = 'none';
        if (registerDiv) registerDiv.style.display = 'none';
        if (resetDiv) resetDiv.style.display = 'none';
        if (homeDiv) homeDiv.style.display = 'none';
        if (retornarHomeDiv) retornarHomeDiv.style.display = 'block';
    }

    function showHome() {
        if (loginDiv) loginDiv.style.display = 'none';
        if (dashboardDiv) dashboardDiv.style.display = 'none';
        if (registerDiv) registerDiv.style.display = 'none';
        if (resetDiv) resetDiv.style.display = 'none';
        if (homeDiv) homeDiv.style.display = 'block';
        if (retornarHomeDiv) retornarHomeDiv.style.display = 'none';
    }

    function showRegister() {
        if (loginDiv) loginDiv.style.display = 'none';
        if (dashboardDiv) dashboardDiv.style.display = 'none';
        if (registerDiv) registerDiv.style.display = 'block';
        if (resetDiv) resetDiv.style.display = 'none';
        if (homeDiv) homeDiv.style.display = 'none';
        if (retornarHomeDiv) retornarHomeDiv.style.display = 'block';
        const registerMessage = document.getElementById('registerMessage');
        if (registerMessage) {
            registerMessage.textContent = '';
        }
    }

    function showReset() {
        if (loginDiv) loginDiv.style.display = 'none';
        if (dashboardDiv) dashboardDiv.style.display = 'none';
        if (registerDiv) registerDiv.style.display = 'none';
        if (resetDiv) resetDiv.style.display = 'block';
        if (homeDiv) homeDiv.style.display = 'none';
        if (retornarHomeDiv) retornarHomeDiv.style.display = 'block';
        const resetMessage = document.getElementById('resetMessage');
        if (resetMessage) {
            resetMessage.textContent = '';
        }
    }

    window.showHome = showHome;
    window.showLogin = showLogin;
    window.showRegister = showRegister;
    window.showReset = showReset;
    window.retornarHome = showHome;

    function togglePasswordVisibility(inputId, toggleId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleId);

        if (input && toggle) {
            toggle.addEventListener('click', function () {
                if (input.type === 'password') {
                    input.type = 'text';
                    toggle.textContent = 'Ocultar';
                } else {
                    input.type = 'password';
                    toggle.textContent = 'Mostrar';
                }
            });
        }
    }

    togglePasswordVisibility('registerPassword', 'toggleRegisterPassword');
    togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

    function renderDashboardUsers(users) {
        if (!userList) return;
        userList.innerHTML = '';

        if (!Array.isArray(users) || users.length === 0) {
            userList.innerHTML = '<li>Nenhum usuário encontrado.</li>';
            return;
        }

        users.forEach(user => {
            const item = document.createElement('li');
            const name = user.first_name || user.name || 'Sem nome';
            const email = user.email || '';
            item.textContent = `${name} - ${email}`;
            userList.appendChild(item);
        });
    }

    async function fetchDashboardUsers() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'login.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar usuários');
            }

            renderDashboardUsers(body.data);
        } catch (error) {
            console.error(error);
            if (message) {
                message.textContent = error.message;
                message.style.color = 'red';
            }
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const body = await response.json();

                if (!response.ok || !body.success) {
                    if (message) {
                        message.textContent = body.message || 'Email ou senha incorretos.';
                        message.style.color = 'red';
                    }
                    return;
                }

                localStorage.setItem('token', body.data.token);
                showDashboard();
            } catch (error) {
                console.error(error);
                if (message) {
                    message.textContent = 'Erro de conexão ao efetuar login.';
                    message.style.color = 'red';
                }
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('token');
            showLogin();
        });
    }

    window.resetPassword = async function () {
        const email = document.getElementById('resetEmail').value;
        const resetMessage = document.getElementById('resetMessage');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const body = await response.json();

            if (!resetMessage) return;

            if (!response.ok || !body.success) {
                resetMessage.textContent = body.message || 'Erro ao solicitar redefinição de senha.';
                resetMessage.style.color = 'red';
                return;
            }

            resetMessage.textContent = body.message || 'Verifique seu email para redefinir a senha.';
            resetMessage.style.color = 'green';
        } catch (error) {
            console.error(error);
            if (resetMessage) {
                resetMessage.textContent = 'Erro de conexão ao solicitar redefinição de senha.';
                resetMessage.style.color = 'red';
            }
        }
    };

    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const first_name = document.getElementById('nome').value;
            const last_name = document.getElementById('sobrenome').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsCheckbox = document.getElementById('termsCheckbox');
            const registerMessage = document.getElementById('registerMessage');

            if (!registerMessage) {
                return;
            }

            if (!termsCheckbox.checked) {
                registerMessage.textContent = 'Você deve aceitar os termos e condições.';
                registerMessage.style.color = 'red';
                return;
            }

            if (password !== confirmPassword) {
                registerMessage.textContent = 'As senhas não coincidem.';
                registerMessage.style.color = 'red';
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ first_name, last_name, username, email, password })
                });
                const body = await response.json();

                if (!response.ok || !body.success) {
                    registerMessage.textContent = body.message || 'Erro ao cadastrar usuário.';
                    registerMessage.style.color = 'red';
                    return;
                }

                registerMessage.textContent = 'Cadastro realizado com sucesso!';
                registerMessage.style.color = 'green';
                registerForm.reset();
            } catch (error) {
                console.error(error);
                registerMessage.textContent = 'Erro de conexão ao cadastrar usuário.';
                registerMessage.style.color = 'red';
            }
        });
    }

    window.resetPassword = async function () {
        const email = document.getElementById('resetEmail').value;
        const resetMessage = document.getElementById('resetMessage');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const body = await response.json();

            if (!resetMessage) return;

            if (!response.ok || !body.success) {
                resetMessage.textContent = body.message || 'Erro ao solicitar redefinição de senha.';
                resetMessage.style.color = 'red';
                return;
            }

            resetMessage.textContent = body.message || 'Verifique seu email para redefinir a senha.';
            resetMessage.style.color = 'green';
        } catch (error) {
            console.error(error);
            if (resetMessage) {
                resetMessage.textContent = 'Erro de conexão ao solicitar redefinição de senha.';
                resetMessage.style.color = 'red';
            }
        }
    };

    if (localStorage.getItem('token')) {
        showDashboard();
    }
});
