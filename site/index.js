import { buscar_produtos } from "./api"

async function carregar_produtos() {
    let produtos
    try {
        // lógica com if para abordar os casos onde tem:
        // sem busca/ordenação, com busca, com ordenação, com os dois
        produtos = await buscar_produtos()
        alert(JSON.stringify(produtos))
    } catch (error) {
        alert(error)
    }
}

window.addEventListener("DOMContentLoaded", carregar_produtos)