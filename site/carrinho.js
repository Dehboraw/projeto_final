let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

function salvar_carrinho() {

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

function carregar_carrinho() {

    const container = document.getElementById("lista-carrinho");

    container.replaceChildren();

    let valorTotal = 0;

    if (carrinho.length === 0) {

        container.innerHTML = `
            <p class="text-center text-muted">
                Seu carrinho está vazio!
            </p>
        `;

        document.getElementById("valor-total").textContent =
            formatarPreco(0);

        document.getElementById("btn-finalizar").disabled = true;

        return;

    }

    document.getElementById("btn-finalizar").disabled = false;

    carrinho.forEach(produto => {

        const subtotal = Number(produto.preco) * produto.qtd;

        valorTotal += subtotal;

        const item = document.createElement("div");

        item.className = "list-group-item";

        item.innerHTML = `

            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div class="d-flex align-items-center gap-3">

                    <img src="${produto.caminho_img || ''}"
                        alt="${produto.nome}"
                        style="width: 85px; height: 85px; object-fit: contain;">

                    <div>

                        <strong>${produto.nome}</strong>

                        <p class="mb-1 text-muted">
                            ${formatarPreco(produto.preco)}
                        </p>

                        <strong>
                            Subtotal: ${formatarPreco(subtotal)}
                        </strong>

                    </div>

                </div>

                <div class="d-flex align-items-center gap-2">

                    <button class="btn btn-outline-secondary btn-sm"
                        onclick="alterar_quantidade(${produto.id}, -1)">
                        -
                    </button>

                    <span>${produto.qtd}</span>

                    <button class="btn btn-outline-secondary btn-sm"
                        onclick="alterar_quantidade(${produto.id}, 1)">
                        +
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="remover_produto(${produto.id})">
                        Remover
                    </button>

                </div>

            </div>

        `;

        container.appendChild(item);

    });

    document.getElementById("valor-total").textContent =
        formatarPreco(valorTotal);

}


function alterar_quantidade(id, quantidade) {

    const produto = carrinho.find(
        item => Number(item.id) === Number(id)
    );

    if (!produto) {
        return;
    }

    produto.qtd += quantidade;

    if (produto.qtd <= 0) {

        remover_produto(id);

        return;

    }

    salvar_carrinho();

    carregar_carrinho();

}

function remover_produto(id) {

    carrinho = carrinho.filter(
        item => Number(item.id) !== Number(id)
    );

    salvar_carrinho();

    carregar_carrinho();

}

function finalizar_compra() {

    if (carrinho.length === 0) {
        return;
    }

    window.location.href = "compra.html";

}

window.addEventListener("DOMContentLoaded", () => {

    carregar_carrinho();

});