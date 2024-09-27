import { getPokemonDetails } from '../Services/PokemonApi.mjs';

window.onload = async () => {
  const url = window.location.href;
  const pokemonName = url.split('?name=')[1];

  if (!pokemonName) {
    console.error('No Pokémon name found in the URL');
    return;
  }

  const lowerCasePokemonName = pokemonName.toLowerCase();

  try {
    const pokemonDetails = await getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemonName}`);
    renderPokemonDetails(pokemonDetails, pokemonName);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    document.getElementById('pokemon-details').innerHTML = `<h2>Error loading Pokémon details. Please try again later.</h2>`;
  }
};

function renderPokemonDetails(pokemon, pokemonName) {
  const pokemonDetailsElement = document.getElementById('pokemon-details');

  const pokemonTypes = pokemon.types.map((type) => {
    const { name } = type.type;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join(', ');

  const pokemonAbilities = pokemon.abilities.map((ability) => {
    const { name } = ability.ability;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }).join(', ');

  const pokemonStats = pokemon.stats.map((stat) => {
    const { name } = stat.stat;
    const { base_stat } = stat;
    return `<li>${name.charAt(0).toUpperCase() + name.slice(1)}: ${base_stat}</li>`;
  }).join('');

  const pokemonMoves = pokemon.moves.map((move) => {
    const { name } = move.move;
    return `<li>${name.charAt(0).toUpperCase() + name.slice(1)}</li>`
  }).join('');

  pokemonDetailsElement.innerHTML = `
    <h2 id="details-name">${pokemonName}</h2>
    <div id="details-img">
      <img src="${pokemon.sprites.front_default}" alt="${pokemonName}">
    </div>
    <div id="details-types">
      <div>
        <p><strong>Types:</strong></p >
      </div>
      <div>
        <span>${pokemonTypes}</span>
      </div>
    </div>
    <div id="details-abilities">
      <div>
        <p><strong>Abilities:</strong></p>
      </div>
      <div>
        <span>${pokemonAbilities}</span>
      </div>
    </div>
    <div id="details-stats">
      <div>
        <p><strong>Stats:</strong></p>
      </div>
      <div>
        <ul>${pokemonStats}</ul>
      </div>
    </div>
    <div id="details-moves">
      <div>
        <p><strong>Moves:</strong></p>
      </div>
      <div>
        <ul>${pokemonMoves}</ul>
      </div>
    </div>
`;
}