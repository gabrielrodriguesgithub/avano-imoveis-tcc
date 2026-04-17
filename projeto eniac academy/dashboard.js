document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const logoutButton = document.getElementById("Logout") || document.getElementById("logout");
    const temaSelect = document.getElementById("tema");
    const exportButton = document.getElementById("export");

    const defaultUsers = [
        { id: 1, name: "Ana Silva", email: "ana.silva@example.com" },
        { id: 2, name: "Carlos Souza", email: "carlos.souza@example.com" },
        { id: 3, name: "Mariana Costa", email: "mariana.costa@example.com" }
    ];

    function getUsers() {
        const users = JSON.parse(localStorage.getItem("dashboardUsers"));
        if (Array.isArray(users) && users.length > 0) {
            return users;
        }
        localStorage.setItem("dashboardUsers", JSON.stringify(defaultUsers));
        return defaultUsers;
    }

    function saveUsers(users) {
        localStorage.setItem("dashboardUsers", JSON.stringify(users));
    }

    function checkAuth() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para acessar o Dashboard!");
            window.location.href = "login.html";
            return;
        }
        fetchUsers();
        carregarConfiguracoes();
    }

    function fetchUsers() {
        const users = getUsers();
        renderUsers(users);
    }

    function renderUsers(users) {
        if (!userList) return;
        userList.innerHTML = "";

        if (users.length === 0) {
            userList.innerHTML = "<tr><td colspan='3'>Nenhum usuário encontrado.</td></tr>";
            return;
        }

        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            userList.appendChild(tr);
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            alert("Você saiu da conta.");
            window.location.href = "login.html";
        });
    }

    function carregarConfiguracoes() {
        const saved = JSON.parse(localStorage.getItem("dashboardConfig")) || { tema: "claro" };
        if (saved.tema) {
            aplicarTema(saved.tema);
            if (temaSelect) temaSelect.value = saved.tema;
        }
    }

    function salvarConfiguracoes() {
        const tema = temaSelect?.value || "claro";
        localStorage.setItem("dashboardConfig", JSON.stringify({ tema }));
        aplicarTema(tema);
    }

    function aplicarTema(tema) {
        document.body.classList.toggle("dark-mode", tema === "escuro");
        localStorage.setItem("dashboardTema", tema);
    }

    if (temaSelect) {
        temaSelect.addEventListener("change", salvarConfiguracoes);
    }

    if (exportButton) {
        exportButton.addEventListener("click", () => {
            const rows = [["ID", "Nome", "Email"]];
            const userRows = document.querySelectorAll("#user-list tr");

            userRows.forEach(row => {
                const cols = row.querySelectorAll("td");
                if (cols.length === 3) {
                    const rowData = [
                        cols[0].innerText,
                        cols[1].innerText,
                        cols[2].innerText
                    ];
                    rows.push(rowData);
                }
            });

            const csvContent = rows.map(e => e.map(field => `"${field}"`).join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "usuarios.csv";
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    checkAuth();
});
