import { checkValidation } from "../components/CreateCard";

describe("checkValidation", () => {
  it("should return isValid as false when question is empty", () => {
    const result = checkValidation(
      "",
      "correct",
      ["incorrect1", "incorrect2", "incorrect3"],
      "description"
    );
    expect(result.isValid).toBe(false);
  });

  it("should return isValid as false when answer is empty", () => {
    const result = checkValidation(
      "question",
      "",
      ["incorrect1", "incorrect2", "incorrect3"],
      "description"
    );
    expect(result.isValid).toBe(false);
  });

  it("should return isValid as false when description is empty", () => {
    const result = checkValidation(
      "question",
      "correct",
      ["incorrect1", "incorrect2", "incorrect3"],
      ""
    );
    expect(result.isValid).toBe(false);
  });

  it("should return isValid as false when any option is empty", () => {
    const result = checkValidation(
      "question",
      "correct",
      ["", "incorrect2", "incorrect3"],
      "description"
    );
    expect(result.isValid).toBe(false);
  });

  it("should return isValid as true when all fields are valid", () => {
    const result = checkValidation(
      "question",
      "correct",
      ["incorrect1", "incorrect2", "incorrect3"],
      "description"
    );
    expect(result.isValid).toBe(true);
  });
});
