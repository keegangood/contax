import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ContactSlice from "./ContactSlice";
import NoteSlice from "./NoteSlice";
import AlertSlice from "./AlertSlice"

const rootReducer = combineReducers({
  auth: AuthSlice,
  contacts: ContactSlice,
  notes: NoteSlice,
  alerts: AlertSlice
});

export default rootReducer;