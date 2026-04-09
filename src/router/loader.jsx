export async function getAllGamesLoader() {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&metacritic=85,100&ordering=-metacritic&page_size=40`,
  );
  const json = await res.json();
  if (!res.ok || !Array.isArray(json.results)) {
    console.error("RAWG API error:", json);
    return [];
  }
  return json.results;
}

export async function getSearchedGames({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&search=${params.slug}&page_size=20`,
  );
  const json = await promise.json();
  if (!promise.ok || !Array.isArray(json.results)) {
    console.error("RAWG API error:", json);
    return [];
  }
  return json.results;
}

export async function getAllGenres() {
  const promise = await fetch(
    `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_RAWG_KEY}`,
  );
  const json = await promise.json();
  if (!promise.ok || !Array.isArray(json.results)) {
    console.error("RAWG API error:", json);
    return [];
  }
  return json.results;
}

export async function getFilteredbyGenreGames({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&genres=${params.slug}&page_size=20`,
  );
  const json = await promise.json();
  if (!promise.ok || !Array.isArray(json.results)) {
    console.error("RAWG API error:", json);
    return [];
  }
  return json.results;
}
