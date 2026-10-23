let link_api = "http://localhost:3000"

async function buscar_produtos(busca = "", ordenacao = ""){
    const resposta = await (fetch(link_api + "/produto"))
    const resposta_json = await resposta.json()
    if(!resposta.ok){
        throw new Error("Erro ao bucar produtos")
    } 
    return resposta_json
}