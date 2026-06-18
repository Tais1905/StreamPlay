const filtros = document.querySelectorAll(".filtro");
const filmes = document.querySelectorAll(".card-filme");
const campoBusca = document.getElementById("campoBusca");

const botoesDetalhes = document.querySelectorAll(".btn-detalhes");
const botoesFavorito = document.querySelectorAll(".btn-favorito");

const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

const formCadastro = document.getElementById("formCadastro");
const telefone = document.getElementById("telefone");
const mensagemSucesso = document.getElementById("mensagemSucesso");
const planos = document.querySelectorAll(".plano");

if (filtros.length > 0 && filmes.length > 0) {
filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtros.forEach((filtro) => filtro.classList.remove("ativo"));
        botao.classList.add("ativo");

        const categoria = botao.dataset.categoria;

        filmes.forEach((filme) => {
            if (categoria === "todos" || filme.dataset.categoria === categoria) {
                filme.style.display = "block";
            } else {
                filme.style.display = "none";
            }
        });
    });
});
}

if (campoBusca) {
campoBusca.addEventListener("input", () => {
    const textoBusca = campoBusca.value.toLowerCase();

    filmes.forEach((filme) => {
        const titulo = filme.dataset.titulo.toLowerCase();

        if (titulo.includes(textoBusca)) {
            filme.style.display = "block";
        } else {
            filme.style.display = "none";
        }
    });
});
}

if (modal && modalTitulo && modalTexto) {
botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const card = botao.parentElement;
        const titulo = card.querySelector("h3").textContent;
        const categoria = card.querySelector("p").textContent;

        modalTitulo.textContent = titulo;
        modalTexto.textContent = `Categoria: ${categoria}. Este conteúdo está disponível para assinantes da plataforma StreamPlay.`;
        modal.style.display = "flex";
    });
});
}

if (fecharModal && modal) {
fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});
}

botoesFavorito.forEach((botao) => {
    botao.addEventListener("click", () => {
        botao.classList.toggle("favoritado");

        if (botao.classList.contains("favoritado")) {
            botao.textContent = "Favoritado";
        } else {
            botao.textContent = "Favoritar";
        }
    });
});

if (telefone) {
telefone.addEventListener("input", () => {
    let valor = telefone.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    telefone.value = valor;
});
}

if (formCadastro && mensagemSucesso) {
formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    mensagemSucesso.textContent = "Cadastro enviado com sucesso!";
    formCadastro.reset();
});
}

planos.forEach((plano) => {
    plano.addEventListener("click", () => {
        const nomePlano = plano.dataset.plano || plano.querySelector("h3").textContent;
        window.location.href = `qrcode.html?plano=${encodeURIComponent(nomePlano)}`;
    });
});

if (modal) {
window.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});
}

 