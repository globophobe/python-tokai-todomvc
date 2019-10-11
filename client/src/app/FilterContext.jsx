import React, { useReducer } from "react";

const initialState = { status: undefined };

let reducer = (state, action) => {
  switch (action.type) {
    case "all":
      return { status: undefined };
    case "done":
      return { status: true };
    case "notDone":
      return { status: false };
    default:
      return;
  }
};

const FilterContext = React.createContext(initialState);

function FilterProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
