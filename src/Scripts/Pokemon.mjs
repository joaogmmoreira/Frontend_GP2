import { getPokemon, getPokemonDetails } from '../Services/PokemonApi.mjs';

const fetchPokemonImages = async (pokemonList) => {
  return await Promise.all(pokemonList.map(async (pokemon) => {
    const response = await getPokemonDetails(pokemon.url);
    return response.sprites.front_default;
  }));
};

const generatePokemonListItems = (pokemonList, pokemonImages) => {
  return pokemonList.map((pokemon, index) => {
    const pokemonImg = pokemonImages[index];
    const name = pokemon.name;

    const capitalized =
      name.charAt(0).toUpperCase()
      + name.slice(1);

    return `
    <a href="../Pages/pokemonDetails.html?name=${capitalized}"><li><img src="${pokemonImg}" alt="${pokemon.name}"> ${capitalized}</li></a>`;
  }).join('');
};

const updatePokemonList = async (url, pokemonListElement) => {
  const pokemonListData = await getPokemon(url);
  const pokemonImages = await fetchPokemonImages(pokemonListData.results);
  const pokemonListItems = generatePokemonListItems(pokemonListData.results, pokemonImages);
  pokemonListElement.innerHTML = pokemonListItems;
  return pokemonListData;
};

const setupNavigationButtons = (pokemonListData, previousButton, nextButton, pokemonListElement) => {
  const newPreviousButton = previousButton.cloneNode(true);
  const newNextButton = nextButton.cloneNode(true);
  previousButton.parentNode.replaceChild(newPreviousButton, previousButton);
  nextButton.parentNode.replaceChild(newNextButton, nextButton);

  if (pokemonListData.previous) {
    newPreviousButton.classList.remove('hidden');
    newPreviousButton.addEventListener('click', async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const previousPokemonListData = await updatePokemonList(pokemonListData.previous, pokemonListElement);
      setupNavigationButtons(previousPokemonListData, newPreviousButton, newNextButton, pokemonListElement);
    });
  } else {
    newPreviousButton.classList.add('hidden');
  }

  if (pokemonListData.next) {
    newNextButton.classList.remove('hidden');
    newNextButton.addEventListener('click', async () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const nextPokemonListData = await updatePokemonList(pokemonListData.next, pokemonListElement);
      setupNavigationButtons(nextPokemonListData, newPreviousButton, newNextButton, pokemonListElement);
    });
  } else {
    newNextButton.classList.add('hidden');
  }
};

const searchPokemon = async () => {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1000`;
  const searchResultsElement = document.getElementById('search-results');

  if (!searchQuery) {
    searchResultsElement.innerHTML = '';
    return;
  }

  try {
    const data = await getPokemonDetails(url);
    const filteredPokemon = data.results.filter(pokemon => pokemon.name.includes(searchQuery));

    searchResultsElement.innerHTML = '';

    for (const pokemon of filteredPokemon) {
      const pokemonDetailResponse = await fetch(pokemon.url);
      const pokemonDetail = await pokemonDetailResponse.json();

      const pokemonItem = document.createElement('div');
      const pokemonLink = document.createElement('a');
      const pokemonImage = document.createElement('img');
      pokemonImage.src = pokemonDetail.sprites.front_default;
      pokemonLink.href = `../Pages/pokemonDetails.html?name=${pokemon.name}`;
      pokemonLink.textContent = pokemon.name;
      pokemonItem.appendChild(pokemonImage);
      pokemonItem.appendChild(pokemonLink);
      searchResultsElement.appendChild(pokemonItem);
    }
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

window.onload = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
  const pokemonListElement = document.getElementById('pokemon-list');
  const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');

  const pokemonListData = await updatePokemonList(url, pokemonListElement);
  setupNavigationButtons(pokemonListData, previousButton, nextButton, pokemonListElement);
  document.getElementById('search-button').addEventListener('click', searchPokemon);
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchPokemon();
    }
  });

  searchInput.focus();
};
