import express, { Request, Response } from 'express';
import Song from './models/song';

const router = express.Router();

// Get all songs
router.get('/', async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving songs', error });
  }
});

// Get a single song by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving song', error });
  }
});

// Create a new song
router.post('/', async (req: Request, res: Response) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error creating song', error });
  }
});

// Update an existing song by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error updating song', error });
  }
});

// Delete a song by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song', error });
  }
});

export default router;
