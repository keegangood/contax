import { createSlice } from "@reduxjs/toolkit";

const isDuplicateNote = (newNoteText, notes) => {
  if (notes) {
    return notes.some(
      (note) => newNoteText.toLowerCase() === note.text.toLowerCase()
    );
  } else {
    return false;
  }
};

const initialState = {
  notes: [],
  newNoteText: "",
  updatedNoteText: "",
};

const NoteSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    addNote: (state, action) => {
      const { newNoteText } = action.payload;

      if (!isDuplicateNote(newNoteText, state.notes)) {
        return {
          ...state,
          notes: state.notes.concat({ text: newNoteText, editing: false }),
          newNoteText: "",
        };
      } else {
        return {
          ...state,
          newNoteText: "Duplicate note!",
        };
      }
    },
    editNote: (state, action) => {
      const { noteIndex, editing } = action.payload;
      return {
        ...state,
        notes: state.notes.map((note, index) =>
          noteIndex === index
            ? { ...note, editing }
            : { ...note, editing: false }
        ),
      };
    },
    updateNote: (state, action) => {
      const { noteIndex, updatedNoteText } = action.payload;
      if (!isDuplicateNote(updatedNoteText, state.notes)) {
        return {
          ...state,
          notes: state.notes.map((note, index) =>
            noteIndex === index
              ? { ...note, text: updatedNoteText, editing: false }
              : note
          ),
          newNoteText: "",
        };
      } else {
        return {
          ...state,
          newNoteText: "Duplicate note!",
        };
      }
    },
    deleteNote: (state, action) => {
      const { noteIndex } = action.payload;

      return {
        ...state,
        notes: state.notes.filter((note, index) => noteIndex !== index),
      };
    },
    setNotes: (state, action) => {
      return {
        ...state,
        notes: action.payload,
      };
    },
    sortNotes: (state, action) => {
      return {
        ...state,
        notes: state.notes.sort((a, b) => a.includes(action.payload)),
      };
    },
    setNewNoteText: (state, action) => {
      const { newNoteText } = action.payload;
      return {
        ...state,
        newNoteText: action.payload,
      };
    },
    setUpdatedNoteText: (state, action) => {
      const { updatedNoteText } = action.payload;
      return {
        ...state,
        updatedNoteText: action.payload,
      };
    },
  },
});

export const {
  setNotes,
  addNote,
  editNote,
  updateNote,
  deleteNote,
  setNewNoteText,
  setUpdatedNoteText,
  sortNotes,
} = NoteSlice.actions;

export default NoteSlice.reducer;
