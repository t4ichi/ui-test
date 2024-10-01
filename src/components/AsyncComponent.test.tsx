import { render, screen, waitFor } from "@testing-library/react";
import AsyncComponent from "./AsyncComponent";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    render(<AsyncComponent />);
    expect(screen.getByText("Initial text")).toBeInTheDocument();
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading..."));
    await waitFor(
      () => {
        expect(screen.getByText("Updated text"));
      },
      {
        timeout: 3000,
      }
    );
  });
});
