let base_url = 'https://kitsu.io/api/edge'

export async function getAnime(nomeAnime) {
    try {
        let url = base_url + `/anime?filter[text]=${nomeAnime}`

        const response = await fetch(url, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        })
        const res = await response.json()
        const listaAnimes = res.data

        for (const anime of listaAnimes) {
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
                anime.streamLink = dados[0].attributes.url
            }
        }

        return listaAnimes;


    } catch (error) {
        console.log(error.message);

    }
}

// export async function getStreamLink(nomeAnime) {
//     let listaAnimes = await getAnime(nomeAnime)

//     try {
//         let links = []

//         for (const anime of listaAnimes) {
//             let relatedUrl = anime.relationships.streamingLinks.links.related;

//             const response = await fetch(relatedUrl, {
//                 headers: {
//                     Accept: 'application/vnd.api+json',
//                     'Content-Type': 'application/vnd.api+json'
//                 }
//             });

//             const res = await response.json();
//             const data = res.data;


//             if (data[0]) {
//                 let link = data[0].attributes.url
//                 links.push(link);
//             }
//         }
//         console.log(links);

//         return links;
//     }
//     catch (error) {
//         console.log(error.message);
//     }
// }
