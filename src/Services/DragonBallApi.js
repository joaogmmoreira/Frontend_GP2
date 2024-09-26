const url = "https://dragonball-api.com/api/characters";

export async function getCharacters() {
  try {
    const response = await fetch(url);
    const requestJson = await response.json();

    return requestJson;

  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}