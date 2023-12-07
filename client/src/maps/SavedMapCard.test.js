import React from "react";
import { render } from "@testing-library/react";
import SavedMapCard from "./SavedMapCard";
let map = {
  name: "BK maps",
  use_username: "jennytak",
  file: "/",
  note: "bk map note",
};
test("renders SavedMapCard without crashing", () => {
  render(<SavedMapCard m={map} />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<SavedMapCard m={map} />);
  expect(asFragment()).toMatchSnapshot();
});
