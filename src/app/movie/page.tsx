"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/services/movie";
import MovieForm from "@/components/moviesForm";
import { toast } from "react-hot-toast";
import MovieCard from "@/components/movieCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAndSetMovies = async () => {
    try {
        setLoading(true);
      const movies = await fetchMovies();
      setMovies(movies);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Movies</h1>
      <MovieForm onAdd={fetchAndSetMovies} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {movies?.map((movie: { _id: string; title: string; description: string }) => (
          <MovieCard key={movie._id} title={movie.title} description={movie.description} />
        ))}
      </div>
    </div>
  );
}
