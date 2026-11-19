let produtos = JSON.parse(localStorage.getItem("carrinho")) || [];

function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

function mostrarToast(mensagem, cor) {

    const toastElement = document.getElementById("liveToast");

    document.getElementById("toast-message").textContent = mensagem;

    toastElement.classList.remove("bg-success", "bg-danger");

    toastElement.classList.add(cor);

    const toast = bootstrap.Toast.getOrCreateInstance(toastElement);

    toast.show();

}


function carregar_produtos() {

    const container = document.getElementById("lista-produtos");

    container.replaceChildren();

    let valorTotal = 0;

    if (produtos.length === 0) {

        container.innerHTML = `
            <p class="text-center text-muted">
                Seu carrinho está vazio!
            </p>
        `;

        document.getElementById("valor-total").textContent =
            formatarPreco(0);

        document.getElementById("btn_enviar").disabled = true;

        return;

    }

    document.getElementById("btn_enviar").disabled = false;

    produtos.forEach(produto => {

        const subtotal = Number(produto.preco) * Number(produto.qtd);

        valorTotal += subtotal;

        const item = document.createElement("div");

        item.className = "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `

            <div>

                <strong>${produto.nome}</strong>

                <p class="mb-0 text-muted">
                    Quantidade: ${produto.qtd}
                </p>

                <small class="text-muted">
                    Unitário: ${formatarPreco(produto.preco)}
                </small>

            </div>

            <strong>
                ${formatarPreco(subtotal)}
            </strong>

        `;

        container.appendChild(item);

    });

    document.getElementById("valor-total").textContent =
        formatarPreco(valorTotal);

}

function pegar_dados() {

    const dados = {

        forma_pagamento: document.getElementById("forma_pagamento").value,

        produtos: produtos.map(produto => ({

            id: produto.id,

            qtd: produto.qtd

        }))

    };

    return dados;

}

const form_compra = document.getElementById("form_compra");

const btn_enviar = document.getElementById("btn_enviar");

form_compra.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (produtos.length === 0) {

        mostrarToast("Seu carrinho está vazio!", "bg-danger");

        return;

    }


    const token = localStorage.getItem("token");

    if (!token) {

        mostrarToast("Você precisa realizar o login!", "bg-danger");

        return;

    }

    btn_enviar.disabled = true;

    btn_enviar.textContent = "Processando compra...";

    const dados = pegar_dados();

    try {

        const resposta = await fetch("http://localhost:3000/compra", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Bearer ${token}`

            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro || "Erro ao realizar a compra."
            );

        }

        mostrarToast(
            `Compra realizada com sucesso! Pedido nº ${resultado.id_compra}`,
            "bg-success"
        );

        localStorage.removeItem("carrinho");

        produtos = [];

        carregar_produtos();

        form_compra.reset();

    } catch (error) {

        console.error("Erro ao realizar compra:", error);

        mostrarToast(
            "Falha ao realizar compra: " + error.message,
            "bg-danger"
        );

    } finally {

        btn_enviar.disabled = produtos.length === 0;

        btn_enviar.textContent = "Finalizar compra";

    }

});

window.addEventListener("DOMContentLoaded", () => {

    carregar_produtos();

});