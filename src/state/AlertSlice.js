import { createSlice } from "@reduxjs/toolkit";

const isDuplicateAlert = (newAlert, alerts) => {
  return alerts.some((alert) => alert.text === newAlert.text);
};

const initialState = {
  alerts: [], // { text: "some message", alertType: "danger/success/info/warning},
};

const AlertSlice = createSlice({
  name: "alerts",
  initialState: initialState,
  reducers: {
    addAlert: (state, action) => {
      return {
        ...state,
        alerts: isDuplicateAlert(action.payload, state.alerts)
          ? state.alerts
          : state.alerts.concat(action.payload),
      };
    },
    removeAlert: (state, action) => {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert === action.payload),
      };
    },
  },
});

export const { addAlert, removeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
