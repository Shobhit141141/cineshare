import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
}

const movieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Movie = models.Movie || model<IMovie>('Movie', movieSchema);
