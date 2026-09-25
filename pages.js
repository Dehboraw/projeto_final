function atualizar_navbar(){
    const nome = localStorage.getItem("nome_cliente")
    const token = localStorage.getItem("token")

    const nav_login = document.getElementById("nav-login") // botão anterior que tava com style com display none
    const btn_user_info = document.getElementById("cli-info") // botão que vai ficar com o nome do cliente

    if(token && nome){
        nav_login.style.display = "none"
        btn_user_info.style.display = "inline"
        btn_user_info.innerText = "Olá, " + nome.split(" ")[0]
    } else {
        nav_login.style.display = "inline"
        btn_user_info.style.display = "none"
    }
}

function logout(){
    localStorage.removeItem("nome_cliente")
    localStorage.removeItem("token")
    window.location.href = "login.html"
}
atualizar_navbar()
//window.addEventListener("DOMContentLoaded", atualizar_navbar)