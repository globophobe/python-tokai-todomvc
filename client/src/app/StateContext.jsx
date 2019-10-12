import React, { useReducer } from "react";
import PropTypes from "prop-types";

const initialState = { filter: undefined, connectionFailure: false };

const reducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "filter":
      return { filter: value };
    case "connectionFailure":
      return { connectionFailure: value };
    default:
      return state;
  }
};

const StateContext = React.createContext(initialState);

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

StateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { StateContext, StateProvider };
