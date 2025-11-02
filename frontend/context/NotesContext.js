import React, { createContext, useContext, useState, useEffect } from "react";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://192.168.1.8:3000/api/get', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const { notes } = await response.json();
            if (notes) setNotes(notes);
        } catch (error) {
            console.log("Error fetching notes:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.8:3000/api/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            setNotes((prev) => prev.filter((note) => note._id !== id))
        } catch (error) {
            console.log("Error deleting note:", error);
        }
    };

    const addNote = async (data) => {
        try {
            const response = await fetch('http://192.168.1.8:3000/api/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const newNote = await response.json();
            setNotes((prev) => [newNote.note, ...prev]);
        } catch (error) {
            console.log("Error adding note:", error);
        }
    };

    const updateNote = async ({ data, id }) => {
        try {
            const response = await fetch(`http://192.168.1.8:3000/api/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const newNote = await response.json();
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? newNote.note : note
                )
            );
        } catch (error) {
            console.log("Error adding note:", error);
        }
    };

    const togglePin = async (id) => {
        try {
            await fetch(`http://192.168.1.8:3000/api/${id}/pin`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            fetchNotes();
        } catch (error) {
            console.log("Error adding note:", error);
        }
    };


    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider value={{ notes, fetchNotes, deleteNote, addNote, updateNote, togglePin }}>
            {children}
        </NotesContext.Provider>
    );
};
