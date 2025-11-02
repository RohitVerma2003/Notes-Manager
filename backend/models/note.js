import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    pinned: {
        type: Boolean,
        default: false,
        required: false
    }
})

const Note = mongoose.model("Note", noteSchema);
export default Note;