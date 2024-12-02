import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/models/Movie";
import { connectDB } from "@/lib/db";

// Get all movies for the authenticated user
// GET /api/movies
// req : -
// res : movies
// Protected
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const movies = await Movie.find({ user: userId });
    return NextResponse.json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Add a new movie
// POST /api/movies
// req : title, description
// res : message, movie
// Protected
export async function POST(req: NextRequest) {
    await connectDB();
  
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { title, description } = await req.json();
  
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }
  
    try {
      const newMovie = await Movie.create({ title, description, user: userId });
      return NextResponse.json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
      console.error("Error adding movie:", (error as Error).message);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }
  
