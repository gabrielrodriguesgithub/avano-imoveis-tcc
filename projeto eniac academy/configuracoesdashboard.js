
/* ================= APLICA TEMA ANTES DE TUDO ================= */
(function () {
    const tema = localStorage.getItem("tema") || "claro";

    if (tema === "escuro") {
        document.body.classList.add("dark-mode");
    }
})();

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

    const selectTema = document.getElementById("tema");

    const temaSalvo = localStorage.getItem("tema") || "claro";

    // 🔥 aplica tema ao carregar
    aplicarTema(temaSalvo);

    // 🔥 se existir o select, atualiza ele
    if (selectTema) {
        selectTema.value = temaSalvo;

        // 🔥 evento de mudança
        selectTema.addEventListener("change", () => {
            salvarConfiguracoes();
        });
    }

});

/* ================= SALVAR ================= */
function salvarConfiguracoes() {

    const selectTema = document.getElementById("tema");

    if (!selectTema) return;

    const tema = selectTema.value;

    // 🔥 salva local
    localStorage.setItem("tema", tema);

    // 🔥 aplica na hora
    aplicarTema(tema);

}

/* ================= APLICAR ================= */
function aplicarTema(tema) {

    if (tema === "escuro") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

}