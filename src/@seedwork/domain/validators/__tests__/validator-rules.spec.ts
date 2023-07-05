
import ValidationError from "../../../../@seedwork/domain/errors/validation-error";
import ValidatorRules from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as any;
  method.apply(validator, params);
}

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

describe("ValidatorRules unit tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    const error = new ValidationError("field is required");

    arrange.forEach((item: any) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });

    // valid cases
    arrange = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach((item: any) =>
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      })
    );
  });

  test("string validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    const error = new ValidationError("field must be a string");

    arrange.forEach((item: any) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    });

    // valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "test", property: "field" },
    ];

    arrange.forEach((item: any) =>
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      })
    );
  });

  test("maxlength validation rule", () => {
    // invalid cases
    let arrange: Values[] = [{ value: "Value exceded", property: "field" }];

    const error = new ValidationError(`field must be less or 5 characters`);

    arrange.forEach((item: any) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });

    // valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "Value", property: "field" },
    ];

    arrange.forEach((item: any) =>
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      })
    );
  });

  test("boolean validation rule", () => {
    // invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];

    const error = new ValidationError(`field must be a boolean`);

    arrange.forEach((item: any) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
        params: [5],
      });
    });

    // valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: false, property: "field" },
      { value: true, property: "field" },
    ];

    arrange.forEach((item: any) =>
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
        params: [5],
      })
    );
  });

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError(`field is required`)
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError(`field must be a string`)
    );

    validator = ValidatorRules.values("Value exceeded", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError(`field must be less or 5 characters`)
    );

    validator = ValidatorRules.values("Value", "field");
    expect(() => validator.required().string().maxLength(5)).not.toThrow(
      new ValidationError(`field must be less or 5 characters`)
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError(`field is required`)
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError(`field must be a boolean`)
    );
  });

  it("should validate when combine two or more validation rules", () => {
    //
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("test", "field").required().string().maxLength(4);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});
