import React from "react";
import { render } from "@testing-library/react";
import SavedMapList from "./SavedMapList";

let maps = [
  {
    name: "BK maps",
    use_username: "jennytak",
    file: "",
    note: "bk map note",
  },
  {
    name: "BK maps 2",
    use_username: "jennytak",
    file: "",
    note: "bk map note",
  },
];
it("renders without crashing", function () {
  render(<SavedMapList maps={maps} />);
});

it("matches snapshot with no jobs", function () {
  const { asFragment } = render(<SavedMapList maps={maps} />);
  expect(asFragment()).toMatchSnapshot();
});
