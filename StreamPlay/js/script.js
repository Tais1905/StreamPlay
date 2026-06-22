// ===== FILTROS =====
const filtros = document.querySelectorAll(".filtro");
const filmes = document.querySelectorAll(".card-filme");
const campoBusca = document.getElementById("campoBusca");

if (filtros.length > 0 && filmes.length > 0) {
    filtros.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtros.forEach((filtro) => filtro.classList.remove("ativo"));
            botao.classList.add("ativo");

            const categoria = botao.dataset.categoria;

            filmes.forEach((filme) => {
                // Pega todas as categorias do filme (separadas por espaço)
                const categoriasFilme = filme.dataset.categoria.split(" ");
                // Pega o tipo (filme ou serie)
                const tipo = filme.dataset.tipo;
                
                let mostrar = false;
                
                if (categoria === "todos") {
                    mostrar = true;
                } else if (categoria === "serie") {
                    // Se for o filtro "Séries", mostra apenas os que têm data-tipo="serie"
                    mostrar = (tipo === "serie");
                } else {
                    // Para outros filtros (acao, comedia, drama), verifica se a categoria está entre as do filme
                    mostrar = categoriasFilme.includes(categoria);
                }
                
                filme.style.display = mostrar ? "block" : "none";
            });
        });
    });
}

// ===== BUSCA =====
if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        const textoBusca = campoBusca.value.toLowerCase();

        filmes.forEach((filme) => {
            const h3 = filme.querySelector("h3");
            const tituloH3 = h3 ? h3.textContent.toLowerCase() : "";

            if (tituloH3.includes(textoBusca)) {
                filme.style.display = "block";
            } else {
                filme.style.display = "none";
            }
        });
    });
}

// ===== MODAL DE DETALHES - COM DESCRIÇÃO COMPLETA =====
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalCategoria = document.getElementById("modalCategoria");
const modalTexto = document.getElementById("modalTexto");
const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

if (modal && modalTitulo && modalTexto) {
    botoesDetalhes.forEach((botao) => {
        botao.addEventListener("click", () => {
            // Pega os dados do botão
            const titulo = botao.dataset.titulo || "Título não disponível";
            const categoria = botao.dataset.categoria || "Categoria não disponível";
            const descricao = botao.dataset.descricao || "Descrição não disponível para este título.";

            // Preenche o modal
            modalTitulo.textContent = titulo;
            modalCategoria.textContent = categoria;
            modalTexto.textContent = descricao;
            
            // Abre o modal
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });
}

if (fecharModal && modal) {
    fecharModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

// Fechar modal clicando fora
if (modal) {
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

// ===== FAVORITAR =====
const botoesFavorito = document.querySelectorAll(".btn-favorito");

botoesFavorito.forEach((botao) => {
    botao.addEventListener("click", () => {
        botao.classList.toggle("favoritado");

        if (botao.classList.contains("favoritado")) {
            botao.textContent = "⭐ Favoritado";
        } else {
            botao.textContent = "Favoritar";
        }
    });
});

// ===== MASCARA TELEFONE =====
const telefone = document.getElementById("telefone");

if (telefone) {
    telefone.addEventListener("input", () => {
        let valor = telefone.value.replace(/\D/g, "");

        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        telefone.value = valor;
    });
}

// ===== FORMULÁRIO DE CADASTRO =====
const formCadastro = document.getElementById("formCadastro");
const mensagemSucesso = document.getElementById("mensagemSucesso");

if (formCadastro && mensagemSucesso) {
    formCadastro.addEventListener("submit", (evento) => {
        evento.preventDefault();

        mensagemSucesso.textContent = "✅ Cadastro realizado com sucesso!";
        mensagemSucesso.style.color = "#ffd700";
        formCadastro.reset();

        setTimeout(() => {
            mensagemSucesso.textContent = "";
        }, 5000);
    });
}

// ===== PLANOS =====
const planos = document.querySelectorAll(".plano");

planos.forEach((plano) => {
    plano.addEventListener("click", () => {
        const nomePlano = plano.dataset.plano || plano.querySelector("h3").textContent;
        window.location.href = `qrcode.html?plano=${encodeURIComponent(nomePlano)}`;
    });
});

// ===== TRAILER - VERSÃO COM VÍDEO LOCAL E FUNDO BONITO =====
const trailerModal = document.getElementById("trailerModal");
const fecharTrailer = document.getElementById("fecharTrailer");
const trailerPlayer = document.getElementById("trailerPlayer");
const botoesTrailer = document.querySelectorAll(".btn-trailer[data-video-local]");

if (botoesTrailer.length > 0 && trailerModal && trailerPlayer) {
    botoesTrailer.forEach((botao) => {
        botao.addEventListener("click", (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
            
            const videoPath = botao.dataset.videoLocal;
            
            if (videoPath) {
                // Define o source do vídeo
                trailerPlayer.querySelector("source").src = videoPath;
                trailerPlayer.load();
                
                // Abre o modal com fundo bonito
                trailerModal.style.display = "flex";
                document.body.style.overflow = "hidden";
                
                // Tenta reproduzir automaticamente
                setTimeout(() => {
                    trailerPlayer.play().catch(() => {
                        // Se não conseguir reproduzir automaticamente, o usuário clica no play
                    });
                }, 300);
            } else {
                alert("Trailer não disponível para este título.");
            }
        });
    });
}

// Fechar modal de trailer
if (fecharTrailer && trailerModal) {
    fecharTrailer.addEventListener("click", () => {
        trailerModal.style.display = "none";
        document.body.style.overflow = "auto";
        trailerPlayer.pause();
        trailerPlayer.currentTime = 0;
    });
}

// Fechar modal de trailer clicando fora
if (trailerModal) {
    trailerModal.addEventListener("click", (evento) => {
        if (evento.target === trailerModal) {
            trailerModal.style.display = "none";
            document.body.style.overflow = "auto";
            trailerPlayer.pause();
            trailerPlayer.currentTime = 0;
        }
    });
}

// ===== VÍDEO EM MODAL (INDEX) - HOUSE OF THE DRAGON =====
const btnAbrirVideo = document.getElementById('btnAbrirVideo');
const videoModal = document.getElementById('videoModal');
const fecharVideo = document.getElementById('fecharVideo');
const videoPlayer = document.getElementById('videoPlayer');

if (btnAbrirVideo && videoModal && videoPlayer) {
    btnAbrirVideo.addEventListener('click', () => {
        videoModal.style.display = 'flex';
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            videoPlayer.play().catch(() => {});
        }, 300);
    });

    fecharVideo.addEventListener('click', () => {
        videoModal.style.display = 'none';
        document.body.style.overflow = "auto";
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = "auto";
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
}

// ===== FECHAR MODAIS COM ESC =====
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        if (modal && modal.style.display === "flex") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (trailerModal && trailerModal.style.display === "flex") {
            trailerModal.style.display = "none";
            document.body.style.overflow = "auto";
            if (trailerPlayer) {
                trailerPlayer.pause();
                trailerPlayer.currentTime = 0;
            }
        }
        if (videoModal && videoModal.style.display === "flex") {
            videoModal.style.display = "none";
            document.body.style.overflow = "auto";
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        }
    }
});

console.log("✨ StreamPlay carregado com sucesso!");
console.log("🎬 Trailer em destaque: House of the Dragon!");
console.log("⭐ Tema moderno dourado aplicado!");
console.log("📱 Layout fullscreen!");
console.log("🖼️ Imagens em 16:9 - SEM ÍCONES!");
console.log("📝 Descrições completas NO MODAL de detalhes!");
console.log("📺 Séries disponíveis:");
console.log("  - House of the Dragon (Drama/Ação)");
console.log("  - Game of Thrones (Drama/Ação)");
console.log("  - The Rookie (Drama/Ação)");
console.log("  - Supernatural (Drama)");
console.log("🎥 Vídeos disponíveis:");
console.log("  - Star Wars The Force Awakens.mp4");
console.log("  - Jurassic Park.mp4");
console.log("  - Guardiões da Galáxia Vol 2.mp4");
console.log("  - Avatar The Way of Water.mp4");
console.log("  - House of the Dragon.mp4 (TRAILER EM DESTAQUE)");
console.log("  - Game of Thrones.mp4");
console.log("  - The Rookie.mp4");
console.log("  - Supernatural.mp4");