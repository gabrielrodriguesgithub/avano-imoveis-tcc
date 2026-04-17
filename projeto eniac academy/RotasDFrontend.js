
/* ================= SUPORTE ================= */

function abrirSuporte() {
    const suporte = document.getElementById("suporteJanela");

    if (suporte) {
        suporte.style.display = "block";

        setTimeout(() => {
            suporte.classList.add("ativo");
        }, 10);
    }
}

function fecharSuporte() {
    const suporte = document.getElementById("suporteJanela");

    if (suporte) {
        suporte.classList.remove("ativo");

        setTimeout(() => {
            suporte.style.display = "none";
        }, 300);
    }
}

/* ================= BUSCA ================= */

function buscarImoveis() {
    const user = sessionStorage.getItem("user");

    if (!user) {
        alert("Você precisa fazer login para buscar imóveis.");
        window.location.href = "login.html";
        return;
    }

    const tipo = document.getElementById("tipo")?.value || "Não definido";
    const bairro = document.getElementById("bairro")?.value || "Não definido";
    const preco = document.getElementById("preco")?.value || "Não definido";

    console.log("Busca:", { tipo, bairro, preco });

    alert(
        "Busca realizada!\n\n" +
        "Tipo: " + tipo + "\n" +
        "Bairro: " + bairro + "\n" +
        "Preço: " + preco
    );
}

/* ================= CTA ================= */

// 📅 AGENDAR VISITA
function irParaAgendamento() {
    const user = sessionStorage.getItem("user");

    if (!user) {
        alert("Você precisa estar logado para agendar uma visita.");
        window.location.href = "login.html";
        return;
    }

    window.location.href = "agendamento.html";
}

// 💬 FALAR COM CORRETOR
function irParaCorretor() {
    const user = sessionStorage.getItem("user");

    if (!user) {
        alert("Você precisa estar logado para falar com um corretor.");
        window.location.href = "login.html";
        return;
    }

    window.location.href = "imoveis.html";
}

/* ================= BOTÃO INTELIGENTE ================= */

function irParaConta() {
    const user = sessionStorage.getItem("user");

    if (user) {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "login.html";
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
        window.location.href = "login.html";
    }

})();

/* ================= REDIRECIONAMENTO INTELIGENTE ================= */

(function redirecionarSeLogado() {

    const user = sessionStorage.getItem("user");
    const paginaAtual = window.location.pathname.split("/").pop();

    if (!user) return;

    const paginasBloqueadas = [
        "login.html"
    ];

    if (paginasBloqueadas.includes(paginaAtual)) {
        window.location.href = "dashboard.html";
    }

})();