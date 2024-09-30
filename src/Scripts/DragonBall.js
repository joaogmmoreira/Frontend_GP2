
let exibirBtn = document.getElementById("exibirPersonagem")

exibirBtn.addEventListener("click", () => {
    if (exibirBtn.innerText == "Exibir personagens") {
        exibirBtn.innerText = "Esconder personagens"
        pegarPersonagens()
    } else if (exibirBtn.innerText == "Esconder personagens") {
        exibirBtn.innerText = "Exibir personagens"
        let a = document.getElementsByClassName("cards")
        console.log(a)
        for (let i = 0; i < a.length; i *= 2) {
            a[i].remove()
        }

    }
})




function criarCardsPersonagens(personagem) {

    let div = document.createElement("div");
    div.className = "cards"
    let img = document.createElement("img");
    img.src = personagem.image;
    let h3 = document.createElement("h3")
    h3.innerText = personagem.name
    let p = document.createElement("p")
    p.innerText = `
    ki: ${personagem.ki}
    raça ${personagem.race}`
    div.append(img, h3, p)


    document.getElementById("personagens").appendChild(div)


}

async function pegarPersonagens() {
    let resposta = await fetch(`https://dragonball-api.com/api/characters?page=2&limit=30`)
    let personagens = await resposta.json();
    personagens.items.forEach(criarCardsPersonagens);

}


