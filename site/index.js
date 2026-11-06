let pagina_atual = 1;
let total_paginas = 1;
async function carregar_produtos(busca = false, pagina = null) {
    const paramsDaUrl = new URLSearchParams(window.location.search);
    if (busca === false) {

        if (paramsDaUrl.has("busca")) {
            document.getElementById("input-busca").value =
                paramsDaUrl.get("busca");
        }
        if (paramsDaUrl.has("ordenacao")) {
            document.getElementById("select-ordem").value =
                paramsDaUrl.get("ordenacao");
        }
        if (paramsDaUrl.has("categoria")) {
            document.getElementById("input-categoria").value =
                paramsDaUrl.get("categoria");
        }
        if (paramsDaUrl.has("preco_min")) {
            document.getElementById("preco-min").value =
                paramsDaUrl.get("preco_min");
        }
        if (paramsDaUrl.has("preco_max")) {
            document.getElementById("preco-max").value =
                paramsDaUrl.get("preco_max");
        }
        pagina_atual = Math.max(
            1,
            parseInt(paramsDaUrl.get("pagina")) || 1
        );

    } else {
        pagina_atual = 1;
    }
    if (pagina !== null) {
        pagina_atual = pagina;
    }
    const params = new URLSearchParams();
    const valorBusca = document.getElementById("input-busca").value.trim();
    const valorOrdem = document.getElementById("select-ordem").value;
    const valorCategoria = document.getElementById("input-categoria").value.trim();
    const precoMin = document.getElementById("preco-min").value;
    const precoMax = document.getElementById("preco-max").value;

    if (valorBusca !== "") {
        params.append("busca", valorBusca);
    }
    if (valorOrdem !== "") {
        params.append("ordenacao", valorOrdem);
    }
    if (valorCategoria !== "") {
        params.append("categoria", valorCategoria);
    }
    if (precoMin !== "") {
        params.append("preco_min", precoMin);
    }
    if (precoMax !== "") {
        params.append("preco_max", precoMax);
    }
    params.append("pagina", pagina_atual);

    const paramsString = params.toString();

    window.history.pushState({},"",`?${paramsString}`);

    try {
        const resposta = await buscar_produtos(params);
        const produtos = resposta.produtos;
        total_paginas = resposta.totalPaginas;
        pagina_atual = resposta.pagina;
        const container = document.getElementById("produtos");
        container.replaceChildren();
        container.className = "grid-produtos";
        if (produtos.length === 0) {

            container.innerHTML = `
                <p class="mensagem-produtos">
                    Não foi encontrado nenhum produto!
                </p>
            `;
        } else {
            produtos.forEach(produto => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <img src="${produto.caminho_img}" alt="${produto.nome}">
                    <div class="nome-produto">
                        ${produto.nome}
                    </div>
                    <div class="info">
                        <div class="descricao">
                            ${produto.descricao.substring(0, 40)}...
                        </div>
                        <div class="preco">
                            R$ ${String(produto.preco).replace(".", ",")}
                        </div>
                    </div>
                    <button class="btn_enviar"
                        onclick="comprar(${produto.id})">
                        Comprar
                    </button>
                `;
                container.appendChild(card);

            });

        }
        atualizar_paginacao();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        document.getElementById("produtos").innerHTML =
            "Não foi possível carregar os produtos.";
    }
}

function atualizar_paginacao() {
    const paginacao = document.getElementById("paginacao");
    paginacao.replaceChildren();
    if (total_paginas <= 1) {
        return;
    }
    function criarBotao(texto, pagina, desabilitado = false, ativo = false) {
        const botao = document.createElement("button");
        botao.textContent = texto;
        botao.className = ativo
            ? "pagina-btn ativo"
            : "pagina-btn";
        botao.disabled = desabilitado;
        botao.addEventListener("click", () => {
            carregar_produtos(false, pagina);
        });
        paginacao.appendChild(botao);
    }
    criarBotao(
        "Anterior",
        pagina_atual - 1,
        pagina_atual === 1
    );
    let inicio = Math.max(1, pagina_atual - 2);
    let fim = Math.min(total_paginas, pagina_atual + 2);
    if (pagina_atual <= 3) {
        fim = Math.min(total_paginas, 5);
    }
    if (pagina_atual >= total_paginas - 2) {
        inicio = Math.max(1, total_paginas - 4);
    }
    for (let i = inicio; i <= fim; i++) {
        criarBotao(
            i,
            i,
            false,
            i === pagina_atual
        );
    }
    criarBotao(
        "Próximo",
        pagina_atual + 1,
        pagina_atual === total_paginas
    );
}

function limpar_filtros() {
    document.getElementById("input-busca").value = "";
    document.getElementById("input-categoria").value = "";
    document.getElementById("preco-min").value = "";
    document.getElementById("preco-max").value = "";
    document.getElementById("select-ordem").value = "";
    carregar_produtos(true);
}

window.addEventListener("DOMContentLoaded", () => {carregar_produtos();});
window.addEventListener("popstate", () => {carregar_produtos(false);});

