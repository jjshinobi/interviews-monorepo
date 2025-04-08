import { sayHello } from "../src";

describe(`${sayHello.name}`, () => {
  it("returns correct greeting with default parameter", () => {
    expect(sayHello()).toBe("Hello, World!");
  });

  it("returns correct greeting with custom name", () => {
    expect(sayHello("Jest")).toBe("Hello, Jest!");
  });

  it("handles empty string input", () => {
    expect(sayHello("")).toBe("Hello, !");
  });
});
