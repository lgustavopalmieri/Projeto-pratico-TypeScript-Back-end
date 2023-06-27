import ValidationError from "../../../@seedwork/errors/validation-error";
import Category from "./category";
import { omit } from "lodash";
describe("Category integration tests", () => {
  describe("create method", () => {
    it("should be a invalid category when name is incorrect", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("name is required")
      );

      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("name is required")
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("name must be a string")
      );

      expect(() => new Category({ name: "t".repeat(256) })).toThrow(
        new ValidationError("name must be less or 255 characters")
      );
    });

    it("should be a invalid category when description is incorrect", () => {
      expect(
        () => new Category({ name: "Movie", description: 4 as any })
      ).toThrow(new ValidationError("description must be a string"));
    });

    it("should be a invalid category when is_active is incorrect", () => {
      expect(
        () => new Category({ name: "Movie", is_active: "" as any })
      ).toThrow(new ValidationError("is_active must be a boolean"));
    });

    it("should be a valid category", () => {
      expect.assertions(0);
      new Category({
        name: "Movie",
      });

      new Category({
        name: "Movie",
        description: "Some description",
      });
      new Category({
        name: "Movie",
        description: null,
      });

      new Category({
        name: "Movie",
        description: "Some description",
        is_active: false,
      });
      new Category({
        name: "Movie",
        description: "Some description",
        is_active: true,
      });
    });
  });

  describe("update method", () => {
    let category = new Category({ name: "Movie" });
    it("should be a invalid category when name is incorrect", () => {
      expect(() => category.update({ name: null, description: null })).toThrow(
        new ValidationError("name is required")
      );

      expect(() => category.update({ name: "", description: "" })).toThrow(
        new ValidationError("name is required")
      );

      expect(() =>
        category.update({ name: 5 as any, description: null })
      ).toThrow(new ValidationError("name must be a string"));

      expect(() => category.update({ name: "t".repeat(256) })).toThrow(
        new ValidationError("name must be less or 255 characters")
      );
    });

    it("should be a invalid category when description is incorrect", () => {
      expect(() =>
        category.update({ name: "Movie", description: 4 as any })
      ).toThrow(new ValidationError("description must be a string"));
    });

    it("should be a valid category", () => {
      expect.assertions(0);
      const category = new Category({
        name: "Movie",
      });

      category.update({ name: "changed", description: "some" });
    });
  });
});
