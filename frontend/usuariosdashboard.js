function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  };
}

document.addEventListener('DOMContentLoaded', function () {
  const listaUsuarios = document.getElementById('lista-usuarios');
  const addUserForm = document.getElementById('add-user-form');

  async function fetchUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
      });
      const body = await response.json();

      if (!response.ok || !body.success) {
        if (response.status === 401) {
          window.location.href = 'index.html';
          return;
        }
        throw new Error(body.message || 'Erro ao carregar usuários');
      }

      renderUsers(body.data);
    } catch (error) {
      console.error(error);
    }
  }

  function renderUsers(users) {
    if (!listaUsuarios) return;
    listaUsuarios.innerHTML = '';

    if (!Array.isArray(users) || users.length === 0) {
      listaUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum usuário encontrado.</td></tr>";
      return;
    }

    users.forEach(user => {
      const row = document.createElement('tr');
      const name = user.first_name || user.name || 'Sem nome';
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${name}</td>
        <td>${user.email || ''}</td>
        <td><button class="btn-delete" data-id="${user.id}">Excluir</button></td>
      `;
      listaUsuarios.appendChild(row);
    });
  }

  if (addUserForm) {
    addUserForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;

      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ first_name: nome, email, password: 'ChangeMe123!' })
        });
        const body = await response.json();

        if (!response.ok || !body.success) {
          if (response.status === 401) {
            window.location.href = 'index.html';
            return;
          }
          throw new Error(body.message || 'Erro ao criar usuário');
        }

        await fetchUsers();
        addUserForm.reset();
      } catch (error) {
        console.error(error);
      }
    });
  }

  if (listaUsuarios) {
    listaUsuarios.addEventListener('click', async function (e) {
      if (e.target.classList.contains('btn-delete')) {
        const id = Number(e.target.dataset.id);

        try {
          const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
          const body = await response.json();

          if (!response.ok || !body.success) {
            if (response.status === 401) {
              window.location.href = 'index.html';
              return;
            }
            throw new Error(body.message || 'Erro ao excluir usuário');
          }

          await fetchUsers();
        } catch (error) {
          console.error(error);
        }
      }
    }
        addUserForm.reset();
      } catch (error) {
        console.error(error);
      }
    });
  }

  if (listaUsuarios) {
    listaUsuarios.addEventListener('click', async function (e) {
      if (e.target.classList.contains('btn-delete')) {
        const id = Number(e.target.dataset.id);

        try {
          const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
          const body = await response.json();

          if (!response.ok || !body.success) {
            if (response.status === 401) {
              window.location.href = 'index.html';
              return;
            }
            throw new Error(body.message || 'Erro ao excluir usuário');
          }

          await fetchUsers();
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  fetchUsers();
});
