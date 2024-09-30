import { getAnime } from "../Services/kitsuApi.js"


let formBuscarAnime = document.getElementById('buscarAnime')
let inputBuscarAnime = document.getElementById('input-search')
let containerAnimes = document.getElementById('container-animes')

async function listarAnimes() {
    let busca = document.getElementById('input-search').value

    if (busca) {
        containerAnimes.textContent = '';

        let listaAnimes = await getAnime(busca)

        let ul = document.createElement('ul')
        ul.id = 'listaAnimes'
        containerAnimes.appendChild(ul)

        listaAnimes.forEach(anime => {
            let animeNome = document.createElement('li')
            let animeLink = document.createElement('a')
            let animeImg = document.createElement('img')
            let animeSinopse = document.createElement('p')

            animeNome.className = 'anime_nome'
            animeImg.className = 'anime_img'
            animeSinopse.className = 'anime_sinopse'
            animeLink.className = 'anime_link'

            animeNome.textContent = anime.attributes.titles.en ?? anime.attributes.titles.en_jp
            animeImg.src = anime.attributes.posterImage.tiny
            animeSinopse.textContent = anime.attributes.synopsis
            animeLink.href = anime.streamLink ?? ''
            animeLink.target = 'blank'
            ul.appendChild(animeNome)
            ul.appendChild(animeLink)
            animeLink.appendChild(animeImg)
            ul.appendChild(animeSinopse)

        });
    }
}

inputBuscarAnime.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        await listarAnimes()
    }
})

formBuscarAnime.addEventListener('submit', async (e) => {
    e.preventDefault()
    await listarAnimes()
})