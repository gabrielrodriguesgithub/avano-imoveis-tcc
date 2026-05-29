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