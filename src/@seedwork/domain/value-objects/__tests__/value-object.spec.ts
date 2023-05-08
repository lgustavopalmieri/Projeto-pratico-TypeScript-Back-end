import ValueObject from "../value-object.vo";

/* Abstract like ValueObject classes can't be instaced */
class StubValueObject extends ValueObject {}

/*
  mock and spy are fake instances
  stub are a new real class created by testing

*/
describe("ValueObject Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "value1" });
    expect(vo.value).toStrictEqual({ prop1: "value1" });
  });
});
