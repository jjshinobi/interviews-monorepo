import { render, screen } from "@testing-library/react";
import App from "../src/App.tsx";

describe("App component", () => {
  it("renders heading", () => {
    render(<App />);

    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
  });
});
