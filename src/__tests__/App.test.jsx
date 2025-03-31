import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

//мокаем localStorage
// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem: vi.fn((key) => store[key] || null),
//     setItem: vi.fn((key, value) => {
//       store[key] = value;
//     }),
//     clear: vi.fn(() => {
//       store = {};
//     }),
//   };
// })();

beforeEach(() => {
  //   localStorageMock.clear();
  vi.clearAllMocks();
});

// Object.defineProperty(window, "localStorage", {
//   value: localStorageMock,
// });

describe("addTask", () => {
  test("добавляет новую задачу в список", async () => {
    render(<App />);

    // Находим элементы
    const input = screen.getByPlaceholderText("Добавить задачу");
    const addButton = screen.getByText("Добавить");

    // Вводим текст и кликаем
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(addButton);

    // Проверяем, что задача появилась
    expect(screen.getByText("Новая задача")).toBeInTheDocument();

    // Проверяем обновление localStorage
    // expect(localStorageMock.setItem).toHaveBeenCalledWith(
    //   "tasks",
    //   expect.stringContaining("Новая задача")
    // );
  });
});

//
