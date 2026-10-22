import { buscar_produtos } from "./api"

async function carregar_produtos() {
    try {
        const produtos = await buscar_produtos()
        alert(JSON.stringify(produtos))
    } catch (error) {
        alert(error)
    }
}

window.addEventListener("DOMContentLoaded", carregar_produtos)