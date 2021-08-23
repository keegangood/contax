import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://contaxapp.herokuapp.com/contacts";
const headers = {
  "Content-Type": "application/json",
};

axios.defaults.withCredentials = true;

// get all contacts for a given user
export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async ({ accessToken, orderBy }, { rejectWithValue }) => {
    const url = BASE_URL + "/";
    const response = await axios
      .get(url, {
        params: { order_by: orderBy },
        headers: { ...headers, Authorization: `token ${accessToken}` },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// get a single contact
export const getContactDetail = createAsyncThunk(
  "contacts/getContactDetail",
  async ({ accessToken, contactId }, { rejectWithValue }) => {
    const url = BASE_URL + `/detail/${contactId}`;
    const response = await axios
      .get(url, {
        headers: { ...headers, Authorization: `token ${accessToken}` },
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// create a new contact
export const createContact = createAsyncThunk(
  "contacts/create",
  async ({ formData, accessToken }, { rejectWithValue }) => {
    const url = BASE_URL + "/";

    const response = await axios
      .post(
        url,
        {
          formData,
        },
        {
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// update a given contact
export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ contactId, formData, accessToken }, { rejectWithValue }) => {
    const url = BASE_URL + `/detail/${contactId}`;

    const response = await axios
      .post(
        url,
        { formData },
        {
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

// delete a contact from the database
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async ({ contactId, accessToken }, { rejectWithValue }) => {
    const url = BASE_URL + `/delete/${contactId}`;

    const response = await axios
      .post(
        url,
        {},
        {
          headers: { ...headers, Authorization: `token ${accessToken}` },
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));

    return response;
  }
);

const _filterContacts = (contacts, filterBy, query) => {
  let filteredContacts = [];

  if(query === '') return contacts

  if (filterBy === "name") {
    filteredContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query)
    );
  } else if (filterBy === "email") {
    filteredContacts = contacts.filter((contact) =>
      contact.email.toLowerCase().includes(query)
    );
  } else if (filterBy === "phone") {
    filteredContacts = contacts.filter(
      (contact) => 
        (contact.cellPhoneNumber && contact.cellPhoneNumber.includes(query)) ||
        (contact.homePhoneNumber && contact.homePhoneNumber.includes(query)) ||
        (contact.workPhoneNumber && contact.workPhoneNumber.includes(query))
    );
  }
  

  return filteredContacts
};

const initialState = {
  contacts: null, // logged in user's current access token
  filteredContacts: [],
  currentContact: null,
  contactLoadingStatus: "PENDING", // status of async operation ['IDLE', 'PENDING', 'SUCCESS', 'FAIL']
  orderBy: "firstName",
  filterBy: "name",
  filterQuery: "",
};

const ContactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setContacts: (state, action) => {
      return {
        contacts: state.contacts.concat(action.payload.contacts),
      };
    },
    setCurrentContact: (state, action) => {
      return {
        ...state,
        currentContact: action.payload,
      };
    },
    setOrderBy: (state, action) => {
      return {
        ...state,
        orderBy: action.payload,
      };
    },
    setFilterBy: (state, action) => {
      return {
        ...state,
        filterBy: action.payload,
      };
    },
    filterContacts: (state, action) => {

      let filtered = _filterContacts(
        state.contacts,
        state.filterBy,
        action.payload.toLowerCase()
      );

      return {
        ...state,
        filterQuery: action.payload,
        filteredContacts: filtered,
      };
    },
  },
  setContactNotes: (state, action) => {
    const {contactId, notes} = action.payload
    return {
      ...state, 
      contacts: state.contacts.map(
        contact=>
        contact.id===contactId 
          ? {...contact, notes: notes}
          : contact
      )
    }
  },
  extraReducers: {
    // GET CONTACTS
    [getContacts.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [getContacts.rejected]: (state, action) => {
      state.contacts = null;
      state.contactLoadingStatus = "IDLE";
    },
    [getContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload.contacts;
      state.filteredContacts = action.payload.contacts;
      state.contactLoadingStatus = "IDLE";
    },

    // CREATE CONTACT
    [createContact.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [createContact.rejected]: (state, action) => {
      state.contacts = null;
      state.contactLoadingStatus = "IDLE";
    },
    [createContact.fulfilled]: (state, action) => {},

    // UPDATE CONTACT
    [updateContact.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [updateContact.rejected]: (state, action) => {
      state.contactLoadingStatus = "IDLE";
    },
    [updateContact.fulfilled]: (state, action) => {
      state.currentContact = null;
      state.contactLoadingStatus = "IDLE";
    },

    // DELETE CONTACT
    [deleteContact.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [deleteContact.rejected]: (state, action) => {
      state.contactLoadingStatus = "IDLE";
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.contacts = action.payload.contacts;
      state.filteredContacts = action.payload.contacts;
      state.contactLoadingStatus = "IDLE";
    },

    // GET SINGLE CONTACT
    [getContactDetail.pending]: (state, action) => {
      state.contactLoadingStatus = "PENDING";
    },
    [getContactDetail.rejected]: (state, action) => {
      state.currentContact = null;
      state.contactLoadingStatus = "IDLE";
    },
    [getContactDetail.fulfilled]: (state, action) => {
      state.currentContact = action.payload.contact;
      state.contactLoadingStatus = "IDLE";
    },
  },
});

export const {
  setContacts,
  setCurrentContact,
  setOrderBy,
  setFilterBy,
  filterContacts,
} = ContactSlice.actions;

export default ContactSlice.reducer;
