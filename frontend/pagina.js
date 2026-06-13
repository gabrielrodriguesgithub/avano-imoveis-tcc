// FILTRO
function filtrar(tipo){
    const lista = document.querySelectorAll(".feature");

    lista.forEach(item => {
        if(tipo === "" || item.dataset.tipo === tipo){
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// SUPORTE
function abrirSuporte(){
    document.getElementById("suporte").classList.add("ativo");
}

function fecharSuporte(){
    document.getElementById("suporte").classList.remove("ativo");
}

// BOTÃO INTERESSE
function abrirContato(){
    window.open("https://wa.me/5511996134517?text=Olá,%20tenho%20interesse%20em%20um%20imóvel");
}

// ============== MODAL IMÓVEL ==============

// Abre o modal com informações do imóvel
function abrirModal(card){
    const modal = document.getElementById("modalImovel");
    const imagem = card.querySelector("img").src;
    const nome = card.dataset.nome;
    const localizacao = card.dataset.localizacao;
    const preco = card.dataset.preco;
    const descricao = card.dataset.descricao;
    const caracteristicas = card.dataset.caracteristicas;
    
    // Preenche o modal com os dados
    document.getElementById("modalImagem").src = imagem;
    document.getElementById("modalNome").textContent = nome;
    document.getElementById("modalLocalizacao").textContent = "📍 " + localizacao;
    document.getElementById("modalPreco").textContent = "💰 " + preco;
    document.getElementById("modalDescricaoTexto").textContent = descricao;
    
    // Preenche características como lista
    const listCaracteristicas = document.getElementById("modalCaracteristicasList");
    listCaracteristicas.innerHTML = "";
    const items = caracteristicas.split("|");
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.trim();
        listCaracteristicas.appendChild(li);
    });
    
    // Atualiza o botão de interesse com mensagem personalizada
    const botao = document.getElementById("modalBotaoInteresse");
    const mensagem = `Olá, tenho interesse no imóvel: ${nome} - ${localizacao}`;
    botao.onclick = () => {
        window.open(`https://wa.me/5511996134517?text=${encodeURIComponent(mensagem)}`, '_blank');
    };
    
    // Mostra o modal
    modal.classList.add("ativo");
    document.body.style.overflow = "hidden";
}

// Fecha o modal
function fecharModal(){
    const modal = document.getElementById("modalImovel");
    modal.classList.remove("ativo");
    document.body.style.overflow = "auto";
}

// Fecha modal ao clicar fora dele
function fecharModalAoClicarFora(event){
    const modal = document.getElementById("modalImovel");
    if(event.target === modal){
        fecharModal();
    }
}

// Fecha modal ao pressionar ESC
document.addEventListener("keydown", (event) => {
    if(event.key === "Escape"){
        fecharModal();
    }
});