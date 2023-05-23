import mongoose, { Document } from 'mongoose';

interface ISong extends Document {
  album: string;
  artist: string | string[];
  artwork: string;
  label: string;
  length: string;
  title: string;
  year: string;
  spotify: string;
  apple: string;
}

const songSchema = new mongoose.Schema<ISong>({
  album: String,
  artist: mongoose.Schema.Types.Mixed,
  artwork: String,
  label: String,
  length: String,
  title: String,
  year: String,
  spotify: String,
  apple: String
}, { versionKey: false });

const Song = mongoose.model<ISong>('Song', songSchema);

export default Song;