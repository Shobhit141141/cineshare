const API_BASE_URL = "/api/movies";

// api to fetch movies
// req : none
// res : movies
export const fetchMovies = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error("Error fetching movies:", (error as Error).message);
    throw new Error("Failed to fetch movies");
  }
};
// api to add movie
// req : title, description
// res : movie
export const addMovie = async (title: string, description: string) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add movie");
    }

    const data = await response.json();
    return data.movie;
  } catch (error) {
    console.error("Error adding movie:", (error as Error).message);
    throw new Error("Failed to add movie");
  }
};
