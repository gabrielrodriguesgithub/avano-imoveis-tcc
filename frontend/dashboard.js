function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const logoutButton = document.getElementById('Logout') || document.getElementById('logout');
    const temaSelect = document.getElementById('tema');
    const exportButton = document.getElementById('export');
    const userChart = document.getElementById('userChart');

    async function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para acessar o Dashboard!');
            window.location.href = 'index.html';
            return;
        }

        await fetchUsers();
        await carregarConfiguracoes();
        await loadDashboardStats();
        await loadVisitsChart();
    }

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
        if (!userList) return;
        userList.innerHTML = '';

        if (!Array.isArray(users) || users.length === 0) {
            userList.innerHTML = "<tr><td colspan='3'>Nenhum usuário encontrado.</td></tr>";
            return;
        }

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.first_name || user.name || ''} ${user.last_name || ''}</td>
                <td>${user.email}</td>
            `;
            userList.appendChild(tr);
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            alert('Você saiu da conta.');
            window.location.href = 'index.html';
        });
    }

    async function carregarConfiguracoes() {
        try {
            const response = await fetch(`${API_BASE_URL}/config`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'index.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar configurações');
            }

            const tema = body.data.tema || 'claro';
            aplicarTema(tema);
            if (temaSelect) temaSelect.value = tema;
        } catch (error) {
            console.error(error);
        }
    }

    function aplicarTema(tema) {
        document.body.classList.toggle('dark-mode', tema === 'escuro');
    }

    if (temaSelect) {
        temaSelect.addEventListener('change', async () => {
            const tema = temaSelect.value || 'claro';
            try {
                const response = await fetch(`${API_BASE_URL}/config`, {
                    method: 'PUT',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ key: 'tema', value: tema })
                });
                const body = await response.json();

                if (!response.ok || !body.success) {
                    if (response.status === 401) {
                        window.location.href = 'index.html';
                        return;
                    }
                    throw new Error(body.message || 'Erro ao salvar configuração');
                }

                aplicarTema(tema);
            } catch (error) {
                console.error(error);
            }
        });
    }

    if (exportButton) {
        exportButton.addEventListener('click', () => {
            const rows = [['ID', 'Nome', 'Email']];
            const userRows = document.querySelectorAll('#user-list tr');

            userRows.forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length === 3) {
                    const rowData = [
                        cols[0].innerText,
                        cols[1].innerText,
                        cols[2].innerText
                    ];
                    rows.push(rowData);
                }
            });

            const csvContent = rows.map(e => e.map(field => `"${field}"`).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'usuarios.csv';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    async function loadDashboardStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'index.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar estatísticas');
            }

            const totalUsersElement = document.getElementById('total-users');
            const newUsersElement = document.getElementById('new-users');

            if (totalUsersElement) {
                totalUsersElement.textContent = body.data.totalUsers || 0;
            }
            if (newUsersElement) {
                newUsersElement.textContent = `+${body.data.totalUsers || 0}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadVisitsChart() {
        if (!userChart) return;

        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/visits-monthly`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'index.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar dados do gráfico');
            }

            const labels = body.data.map(item => item.month);
            const data = body.data.map(item => item.count);

            new Chart(userChart.getContext('2d'), {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Visitas aos Imóveis',
                        data,
                        borderColor: '#e53935',
                        backgroundColor: 'rgba(229, 57, 53, 0.2)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#e53935'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#333',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: '#555' }
                        },
                        x: { ticks: { color: '#555' } }
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }             window.location.href = 'index.html';
                        return;
                    }
                    throw new Error(body.message || 'Erro ao salvar configuração');
                }

                aplicarTema(tema);
            } catch (error) {
                console.error(error);
            }
        });
    }

    if (exportButton) {
        exportButton.addEventListener('click', () => {
            const rows = [['ID', 'Nome', 'Email']];
            const userRows = document.querySelectorAll('#user-list tr');

            userRows.forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length === 3) {
                    const rowData = [
                        cols[0].innerText,
                        cols[1].innerText,
                        cols[2].innerText
                    ];
                    rows.push(rowData);
                }
            });

            const csvContent = rows.map(e => e.map(field => `"${field}"`).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'usuarios.csv';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    async function loadDashboardStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'index.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar estatísticas');
            }

            const totalUsersElement = document.getElementById('total-users');
            const newUsersElement = document.getElementById('new-users');

            if (totalUsersElement) {
                totalUsersElement.textContent = body.data.totalUsers || 0;
            }
            if (newUsersElement) {
                newUsersElement.textContent = `+${body.data.totalUsers || 0}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadVisitsChart() {
        if (!userChart) return;

        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/visits-monthly`, {
                headers: getAuthHeaders()
            });
            const body = await response.json();

            if (!response.ok || !body.success) {
                if (response.status === 401) {
                    window.location.href = 'index.html';
                    return;
                }
                throw new Error(body.message || 'Erro ao carregar dados do gráfico');
            }

            const labels = body.data.map(item => item.month);
            const data = body.data.map(item => item.count);

            new Chart(userChart.getContext('2d'), {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Visitas aos Imóveis',
                        data,
                        borderColor: '#e53935',
                        backgroundColor: 'rgba(229, 57, 53, 0.2)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#e53935'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#333',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: '#555' }
                        },
                        x: { ticks: { color: '#555' } }
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    checkAuth();
});
