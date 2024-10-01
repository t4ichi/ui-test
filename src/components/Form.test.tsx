import { render, screen } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Form", () => {
  it("初期状態のテキストが空になっている", () => {
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent("");
  });

  it("入力したものがsubmitされる", async () => {
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "hoge");
    expect(screen.getByDisplayValue("hoge")).toBeInTheDocument();
    expect(screen.getByDisplayValue("hoge")).toHaveValue("hoge");
  });

  it("submitボタンが押されるとalertが表示される", async () => {
    const spy = jest.spyOn(window, "alert");

    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");
    const button = screen.getByRole("button");
    await userEvent.type(input, "hoge");
    await userEvent.click(button);
    expect(spy).toHaveBeenCalledWith("submitted: hoge");
  });
});
