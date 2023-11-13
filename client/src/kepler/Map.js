import React, { useEffect } from "react";
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
import nycRestaurants from "../data/nyc_restaurant_inspections.csv";
import restaurantConfig from "../data/restaurant_config.json";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function Map({ dataType }) {
  const mapStates = {
    trees: {
      label: "NYC trees",
      id: "nyctrees",
      data: nycTrees,
      config: treeConfig,
    },
    restaurants: {
      label: "NYC restaurants",
      id: "nycrestaurants",
      data: nycRestaurants,
      config: restaurantConfig,
    },
  };
  const data = mapStates[dataType];

  return (
    <Provider store={store}>
      <KeplerMap data={data} />
    </Provider>
  );
}

function KeplerMap({ data }) {
  const dispatch = useDispatch();
  const dispatchData = Processors.processCsvData(data.data);

  React.useEffect(() => {
    if (dispatchData) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: data.label,
              id: data.id,
            },
            data: dispatchData,
          },
          option: {
            centerMap: true,
            readOnly: false,
          },
          config: data.config,
        })
      );
    }
  }, [dispatch, dispatchData]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
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
