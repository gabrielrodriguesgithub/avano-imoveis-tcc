function getAuthHeaders() {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    };
}

/* ================= SUPORTE ================= */

function abrirSuporte() {
    const suporte = document.getElementById('suporteJanela');

    if (suporte) {
        suporte.style.display = 'block';

        setTimeout(() => {
            suporte.classList.add('ativo');
        }, 10);
    }
}

function fecharSuporte() {
    const suporte = document.getElementById('suporteJanela');

    if (suporte) {
        suporte.classList.remove('ativo');

        setTimeout(() => {
            suporte.style.display = 'none';
        }, 300);
    }
}

/* ================= BUSCA ================= */

async function buscarImoveis() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa fazer login para buscar imóveis.');
        window.location.href = 'index.html';
        return;
    }

    const tipo = document.getElementById('tipo')?.value || '';
    const bairro = document.getElementById('bairro')?.value || '';
    const preco = document.getElementById('preco')?.value || '';

    const query = new URLSearchParams();

    if (tipo) query.set('tipo', tipo);
    if (bairro) query.set('bairro', bairro);
    if (preco) query.set('preco', preco);

    const url = `${API_BASE_URL}/properties?${query.toString()}`;

    try {
        const response = await fetch(url, {
            headers: getAuthHeaders()
        });
        const body = await response.json();

        if (!response.ok || !body.success) {
            if (response.status === 401) {
                window.location.href = 'index.html';
                return;
            }
            throw new Error(body.message || 'Erro ao buscar imóveis');
        }

        alert(`Busca realizada! ${body.data.length} imóveis encontrados.`);
        console.log('Busca:', { tipo, bairro, preco, results: body.data });
    } catch (error) {
        console.error(error);
        alert(error.message || 'Erro ao buscar imóveis');
    }
}

/* ================= CTA ================= */

// 📅 AGENDAR VISITA
function irParaAgendamento() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para agendar uma visita.');
        window.location.href = 'index.html';
        return;
    }

    window.open('https://wa.me/5511996134517?text=Olá,%20quero%20agendar%20uma%20visita', '_blank');        
}

// 💬 FALAR COM CORRETOR
function irParaCorretor() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para falar com um corretor.');
        window.location.href = 'index.html';
        return;
    }

    
    window.open('https://wa.me/5511996134517?text=Olá,%20quero%20falar%20com%20um%20corretor', '_blank');        
}

/* ================= BOTÃO INTELIGENTE ================= */

function irParaConta() {
    const token = localStorage.getItem('token');

    if (token) {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

/* ================= SOBRE NÓS (SCROLL) ================= */

// 🔥 força scroll suave mesmo se clicar várias vezes
function irParaSobre() {
    const sobre = document.getElementById("sobre");

    if (sobre) {
        sobre.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* ================= EVENTO DO RODAPÉ ================= */

document.addEventListener("DOMContentLoaded", () => {

    const linkSobre = document.querySelector('a[href="#sobre"]');

    if (linkSobre) {
        linkSobre.addEventListener("click", function(e) {
            e.preventDefault();
            irParaSobre();
        });
    }

});

/* ================= PROTEÇÃO DE PÁGINAS ================= */

(function protegerPaginas() {

    const paginasProtegidas = [
        "agendamento.html",
        "imoveis.html",
        "dashboard.html"
    ];

    const paginaAtual = window.location.pathname.split("/").pop();

    const user = sessionStorage.getItem("user");

    if (paginasProtegidas.includes(paginaAtual) && !user) {
        alert("Acesso restrito. Faça login primeiro.");
        window.location.href = "index.html";
    }

})();

/* ================= REDIRECIONAMENTO INTELIGENTE ================= */

(function redirecionarSeLogado() {

    const user = sessionStorage.getItem("user");
    const paginaAtual = window.location.pathname.split("/").pop();

    if (!user) return;

    const paginasBloqueadas = [
        "index.html"
    ];

    if (paginasBloqueadas.includes(paginaAtual)) {
        window.location.href = "dashboard.html";
    }

})();

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

function AcessarDashboard() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa fazer login para acessar o Dashboard!');
        window.location.href = 'index.html';
    } else {
        window.location.href = 'dashboard.html';
}};