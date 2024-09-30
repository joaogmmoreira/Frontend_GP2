export const getPokemon = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export const getPokemonDetails = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  return data;
}