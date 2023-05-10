import { deepFreeze } from "./object";

describe("object unit tests", () => {
  it("should not free a scalable value", () => {
    const str = deepFreeze("a");
    expect(typeof str).toBe("string");

    let bool = deepFreeze(true);
    expect(typeof bool).toBe("boolean");

    bool = deepFreeze(false);
    expect(typeof bool).toBe("boolean");

    const num = deepFreeze(5);
    expect(typeof num).toBe("number");
  });

  it("should validate if is a immutable object", () => {
    const obj = deepFreeze({
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    });

    expect(() => {
      (obj as any).prop1 = "value";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (obj as any).deep.prop2 = "value";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
