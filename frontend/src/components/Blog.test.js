import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<BlogList />", () => {
  let component;
  const blogs = {
    title: "How to Code with VScode",
    author: "wujinhjun",
    url: "www.something.com",
    likes: 16,
    user: { id: "111111111111111" },
  };

  const mockHandlerUpdate = jest.fn();
  const mockHandlerAlertType = jest.fn();
  const mockHandlerAlertMsg = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blogs}
        handleUpdate={mockHandlerUpdate}
        handleAlertMsg={mockHandlerAlertMsg}
        handleAlertType={mockHandlerAlertType}
      />
    );
  });

  test("check title and author", () => {
    expect(component.container).toHaveTextContent("How to Code with VScode");
    expect(component.container).toHaveTextContent("wujinhjun");
  });

  test("check url and details", async () => {
    const user = userEvent.setup();
    expect(component).toBeDefined();
    expect(component.getAllByText("view")).toBeDefined();

    const btn = component.getByText("view");
    await user.click(btn);

    expect(component.findAllByText("16")).toBeDefined();
  });

  test("click once and twice", async () => {
    const user = userEvent.setup();
    const btnView = component.getByText("view");
    await user.click(btnView);
    expect(component.findAllByText("16")).toBeDefined();

    const btnLike = component.getByText("like");

    await user.click(btnLike);
    expect(component.findAllByText("17")).toBeDefined();
    await user.click(btnLike);
    expect(component.findAllByText("18")).toBeDefined();
  });
});
