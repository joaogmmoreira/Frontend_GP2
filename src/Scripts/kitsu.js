import { getAnime } from "../Services/kitsuApi.js"

let formBuscarAnime = document.getElementById('buscar-anime')
let inputBuscarAnime = document.getElementById('input-busca')
let containerMain = document.getElementById('container-main')


async function listarAnimes() {
    let busca = document.getElementById('input-busca').value;

    if (busca) {

        let listaAnimes = await getAnime(busca);
        let container = document.getElementById('container-animes');

        inputBuscarAnime.value = '';
        container.innerHTML = '';


        listaAnimes.forEach(anime => {
            if (anime.streamLink) {
                let card = document.createElement('div');
                card.className = 'anime-card';

                let animeImg = document.createElement('img');
                animeImg.src = anime.attributes.posterImage.small;
                card.appendChild(animeImg);

                let cardBody = document.createElement('div');
                cardBody.className = 'anime-card-body';

                let animeTitle = document.createElement('h5');
                animeTitle.className = 'anime-card-title';
                animeTitle.textContent = anime.attributes.titles.en ?? anime.attributes.titles.en_jp;
                cardBody.appendChild(animeTitle);

                let animeSynopsis = document.createElement('p');
                animeSynopsis.className = 'anime-card-synopsis';
                animeSynopsis.textContent = anime.attributes.synopsis;
                cardBody.appendChild(animeSynopsis);

                let animeLink = document.createElement('a');
                animeLink.className = 'anime-card-link';
                animeLink.href = anime.streamLink;
                animeLink.target = '_blank';
                animeLink.textContent = 'Assistir';

                cardBody.appendChild(animeLink);
                card.appendChild(cardBody);
                container.appendChild(card);
            }
        });
    }
}


inputBuscarAnime.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        await listarAnimes()
        containerMain.classList.remove('center-content')
    }
})

formBuscarAnime.addEventListener('submit', async (e) => {
    e.preventDefault()
    await listarAnimes()
    containerMain.classList.remove('center-content')

})