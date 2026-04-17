document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutButton = document.getElementById("logout");
    const message = document.getElementById("message");

    const loginDiv = document.getElementById("login");
    const dashboardDiv = document.getElementById("dashboard");
    const registerDiv = document.getElementById("registerContainer");
    const resetDiv = document.getElementById("resetContainer");
    const homeDiv = document.getElementById("home");
    const retornarHomeDiv = document.getElementById("retornarHome");

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [
        { email: "admin@example.com", password: "admin123", name: "Administrador" }
    ];

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function getUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    function showDashboard() {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "block";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
    }

    function showLogin() {
        if (loginDiv) loginDiv.style.display = "block";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
    }

    function showHome() {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "block";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "none";
    }

    function showRegister() {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "block";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
        const registerMessage = document.getElementById("registerMessage");
        if (registerMessage) {
            registerMessage.textContent = "";
        }
    }

    function showReset() {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "block";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
        const resetMessage = document.getElementById("resetMessage");
        if (resetMessage) {
            resetMessage.textContent = "";
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
            toggle.addEventListener("click", function () {
                if (input.type === "password") {
                    input.type = "text";
                    toggle.textContent = "Ocultar";
                } else {
                    input.type = "password";
                    toggle.textContent = "Mostrar";
                }
            });
        }
    }

    togglePasswordVisibility("registerPassword", "toggleRegisterPassword");
    togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const user = getUserByEmail(email);

            if (user && user.password === password) {
                localStorage.setItem("token", email);
                showDashboard();
            } else {
                if (message) {
                    message.textContent = "Email ou senha incorretos.";
                    message.style.color = "red";
                }
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("token");
            showLogin();
        });
    }

    window.resetPassword = function () {
        const email = document.getElementById("resetEmail").value;
        const resetMessage = document.getElementById("resetMessage");
        const user = getUserByEmail(email);

        if (resetMessage) {
            if (user) {
                resetMessage.textContent = "Verifique seu email para redefinir a senha.";
                resetMessage.style.color = "green";
            } else {
                resetMessage.textContent = "Email não encontrado.";
                resetMessage.style.color = "red";
            }
        }
    };

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const termsCheckbox = document.getElementById("termsCheckbox");
            const registerMessage = document.getElementById("registerMessage");
            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (!registerMessage) {
                return;
            }

            if (!termsCheckbox.checked) {
                registerMessage.textContent = "Você deve aceitar os termos e condições.";
                registerMessage.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                registerMessage.textContent = "As senhas não coincidem.";
                registerMessage.style.color = "red";
                return;
            }

            if (getUserByEmail(email)) {
                registerMessage.textContent = "Este email já está cadastrado.";
                registerMessage.style.color = "red";
                return;
            }

            users.push({ email, password, name: email });
            saveUsers(users);

            registerMessage.textContent = "Cadastro realizado com sucesso!";
            registerMessage.style.color = "green";
            registerForm.reset();
        });
    }

    if (localStorage.getItem("token")) {
        showDashboard();
    }
});
