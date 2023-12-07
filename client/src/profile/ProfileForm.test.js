import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";
// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
    <Router>
      <UserProvider>
        <ProfileForm />
      </UserProvider>
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});
