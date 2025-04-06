import { render, screen } from "@testing-library/react";
import App from "../../../src/infrastructure/ui/App.tsx";

describe("App component", () => {
  it("renders heading", () => {
    render(<App />);

    expect(screen.getByText(/Snake Game/i)).toBeInTheDocument();
  });
});
