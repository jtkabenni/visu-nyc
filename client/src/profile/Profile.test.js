import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

it("matches snapshot", function () {
  const { asFragment } = render(
    <Router>
      <UserProvider>
        <Profile />
      </UserProvider>
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
