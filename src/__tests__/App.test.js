import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders correct text on the home page", () => {
  render(<App />);
  screen.debug(); // Tämä tulostaa renderoidun tulosteen konsoliin
  expect(screen.getByText(/Kirjautuminen/i)).toBeInTheDocument();
});
