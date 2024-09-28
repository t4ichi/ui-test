import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
  it("Buttonがレンダリングされている", () => {
    render(<Button label="ボタン" onClick={() => alert("click")} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("ボタン");
  });
});
