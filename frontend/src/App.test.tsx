import React from "react";
import {render} from "@testing-library/react";
import App from "./App";

test("Banner Loads", () => {
    const {getByText} = render(<App title="Test App Title"/>);
    const bannerElement = getByText(/Test App Title/i);
    expect(bannerElement).toBeInTheDocument();
});
