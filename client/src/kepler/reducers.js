import { combineReducers } from "redux";

import keplerGlReducer from "kepler.gl/reducers";

const initialAppState = {
  appName: "visu-nyc",
  loaded: false,
};

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
  // app: handleActions(
  //   {
  //     // empty
  //   },
  //   initialAppState
  // ),
  // routing: routerReducer,
});

export default reducers;
