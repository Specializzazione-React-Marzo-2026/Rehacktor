async function fetchGamesList(url) {
  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok || !Array.isArray(json.results)) {
    console.error("RAWG API error:", json);
    return [];
  }

  return json.results;
}

async function getFilteredGames(filterKey, slug) {
  return fetchGamesList(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&${filterKey}=${slug}&page_size=20`,
  );
}

export async function getAllGamesLoader() {
  return fetchGamesList(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&metacritic=85,100&ordering=-metacritic&page_size=40`,
  );
}

export async function getSearchedGames({ params }) {
  return fetchGamesList(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&search=${params.slug}&page_size=20`,
  );
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
  return getFilteredGames("genres", params.slug);
}

export async function getFilteredByDeveloperGames({ params }) {
  return getFilteredGames("developers", params.slug);
}

export async function getFilteredByPublisherGames({ params }) {
  return getFilteredGames("publishers", params.slug);
}

export async function getFilteredByPlatformGames({ params }) {
  const byPlatformId = await getFilteredGames("platforms", params.id);

  // Card badges often use RAWG parent platform ids (for example PlayStation = 2),
  // which are not resolved by `platforms=id`.
  if (Array.isArray(byPlatformId) && byPlatformId.length > 0) {
    return byPlatformId;
  }

  const byParentPlatformId = await getFilteredGames("parent_platforms", params.id);

  if (Array.isArray(byParentPlatformId) && byParentPlatformId.length > 0) {
    return byParentPlatformId;
  }

  return getFilteredGames("parent_platforms", params.slug);
}

export async function getGameDetails({ params }) {
  const promise = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_RAWG_KEY}`,
  );
  const json = await promise.json();
  if (!promise.ok) {
    console.error("RAWG API error:", json);
    return null;
  }
  return json;
}