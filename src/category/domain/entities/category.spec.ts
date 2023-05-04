import Category, { CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";

describe("Category Unit Tests", () => {
  test("category constructor", () => {
    let category = new Category({
      name: "Movie",
    });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    // ##################################################
    let created_at = new Date();

    category = new Category({
      name: "Movie",
      description: "Some description",
      is_active: false,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      is_active: false,
      created_at,
    });

    // ##################################################
    category = new Category({
      name: "Movie",
      description: "Other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description",
    });

    // ##################################################
    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    // ##################################################
    created_at = new Date();

    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = {
      props: CategoryProperties;
      id?: string;
    };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: "bea8eacb-7a94-4243-9865-d611e8ff3b3d" },
    ];

    data.forEach((i) => {
      let category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
      expect(uuidValidate("frebc")).toBeFalsy();
    });
  });

  test("name field getter", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("description field getter and setter", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "Some description",
    });
    expect(category.description).toBe("Some description");

    category = new Category({
      name: "Movie",
    });
    category["description"] = "Another description";
    expect(category.description).toBe("Another description");

    category["description"] = undefined;
    expect(category.description).toBeNull;

    category["description"] = null;
    expect(category.description).toBeNull;
  });

  test("is_active getter and setter prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });

  test("created_at getter prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });
});
