import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserSearch } from "./UserSearch";
import "@testing-library/jest-dom";
import axios from "axios";

const user = userEvent.setup();
jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("UserSearch", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });
  it("入力フィールドに値を入力し、検索ボタンをクリックすると適切なAPIリクエストが発生する", async () => {
    const users = [{ id: 1, name: "hoge" }];
    const resp = { data: users };
    mockedAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(input, "hoge");
    await user.click(button);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${users[0].name}`
    );
  });

  it("APIから取得したユーザー情報が正しく画面に表示される", async () => {
    const userInfo = {
      id: 1,
      name: "hoge",
    };
    const resp = { data: userInfo };
    mockedAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.type(input, userInfo.name);
    await user.click(button);
    await waitFor(() =>
      expect(screen.getByText(userInfo.name)).toBeInTheDocument()
    );
  });
});
