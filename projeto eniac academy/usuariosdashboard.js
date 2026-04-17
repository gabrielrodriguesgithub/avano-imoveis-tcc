document.addEventListener("DOMContentLoaded", function () {
  const listaUsuarios = document.getElementById("lista-usuarios");
  const addUserForm = document.getElementById("add-user-form");
  const STORAGE_KEY = "usuariosDashboardUsers";
  const INIT_KEY = "usuariosDashboardInitialized";

  const defaultUsers = [
    { id: 1, name: "Ana Silva", email: "ana.silva@example.com" },
    { id: 2, name: "Pedro Lima", email: "pedro.lima@example.com" }
  ];

  function getUsers() {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function fetchUsers() {
    renderUsers(getUsers());
  }

  function renderUsers(users) {
    if (!listaUsuarios) return;
    listaUsuarios.innerHTML = "";

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button class="btn-delete" data-id="${user.id}">Excluir</button></td>
      `;
      listaUsuarios.appendChild(row);
    });

    if (users.length === 0) {
      listaUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum usuário encontrado.</td></tr>";
    }
  }

  if (addUserForm) {
    addUserForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;

      const users = getUsers();
      const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      users.push({ id: nextId, name: nome, email: email });
      saveUsers(users);
      fetchUsers();
      addUserForm.reset();
    });
  }

  if (listaUsuarios) {
    listaUsuarios.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-delete")) {
        const id = Number(e.target.dataset.id);
        const users = getUsers().filter(user => user.id !== id);
        saveUsers(users);
        fetchUsers();
      }
    });
  }

  if (!localStorage.getItem(INIT_KEY)) {
    const users = getUsers();
    users.push({ id: users.length + 1, name: "Anônimo", email: `anon@local${Date.now()}.com` });
    saveUsers(users);
    localStorage.setItem(INIT_KEY, "true");
  }

  fetchUsers();
});
