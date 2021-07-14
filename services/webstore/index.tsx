/* eslint-disable no-underscore-dangle */
import React, { useReducer } from 'react';

import actions from './actions';
import initialState from './initialize';
import reducer from './reducer';

const StoreContext: any = React.createContext<{
  state: {};
  dispatch: React.Dispatch<any>;
}>({
  state: {},
  dispatch: () => null,
});

// This is a simple helper function that will take a type
// (from the constants above) and a payload, which will be the
// value which needs to be affected in state .It returns
// a simple object that will be passed to our dispatch function
export const createAction = (type, payload) => ({
  type,
  payload,
});

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actionDispatch = (type, payload) =>
    dispatch(createAction(type, payload));

  return (
    <StoreContext.Provider value={{ state, dispatch, actionDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider, actions };
