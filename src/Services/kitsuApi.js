let base_url = 'https://kitsu.io/api/edge';

export async function getAnime(nomeAnime) {
    try {
        let url = base_url + `/anime?filter[text]=${nomeAnime}`;

        const response = await fetch(url, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        });

        const res = await response.json();
        const listaAnimes = res.data;

        const promises = listaAnimes.map(async (anime) => {
            try {
                let relatedUrl = anime.relationships.streamingLinks.links.related;
                const resp = await fetch(relatedUrl, {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    }
                });
                const resposta = await resp.json();
                const dados = resposta.data;

                if (dados[0]) {

                    if (dados[0].attributes.url.includes('http')) {
                        anime.streamLink = dados[0].attributes.url
                        console.log(anime.streamLink)
                    }
                }
            } catch (error) {
                console.log(`Erro ao buscar stream link para ${anime.attributes.titles.en ?? anime.attributes.titles.en_jp}: ${error.message}`);
            }
        });

        await Promise.all(promises);

        return listaAnimes;

    } catch (error) {
        console.log(error.message);
    }
}
