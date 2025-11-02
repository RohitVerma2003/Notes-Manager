import Note from "../models/note.js";
import express from "express"

export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and Content are required" });
        }

        const note = new Note({ title, content });
        await note.save();
        res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = title || note.title;
        note.content = content || note.content;

        await note.save();
        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getNotes = async (req, res) => {
    try {
        const notes = (await Note.find()).sort((a, b) => b.pinned - a.pinned || b.createdAt - a.createdAt);
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


export const pinNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.pinned = !note.pinned;
        await note.save();
        res.status(200).json({ message: "Note pinned status updated", note });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const router = express.Router();

router.get('/get', getNotes);
router.post('/add', addNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', pinNote);

export default router;