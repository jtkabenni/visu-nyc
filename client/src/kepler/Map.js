import React from "react";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import Processors from "kepler.gl/processors";
import nycTrees from "../data/nyc_census_trees.csv";
import treeConfig from "../data/tree_config.json";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function Map() {
  return (
    <Provider store={store}>
      <KeplerMap />
    </Provider>
  );
}

function KeplerMap() {
  const dispatch = useDispatch();

  const data = Processors.processCsvData(nycTrees);

  React.useEffect(() => {
    if (data) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "NYC Trees",
              id: "nyctrees",
            },
            data: data,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: treeConfig,
        })
      );
    }
  }, [dispatch, data]);

  return (
    <div
      style={{
        position: "absolute",
        width: "90%",
        height: "90%",
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            id="nyctrees"
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  );
}
