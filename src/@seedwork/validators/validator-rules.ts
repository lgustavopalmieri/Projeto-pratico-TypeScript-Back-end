import ValidationError from "../../@seedwork/errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): this {
    // !this.value => below is better to show the rules intentions
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`${this.property} is required`);
    }
    return this;
  }

  string(): this {
    if (typeof this.value !== "string") {
      throw new ValidationError(`${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (this.value.length > max) {
      throw new ValidationError(
        `${this.property} must be less or ${max} characters`
      );
    }
    return this;
  }
}

// ValidatorRules.values("xpto value", "fieldname").required().string().maxLength();

//OPTION
// namespace ValidatorRules{
//   values() {}

//   required() {}

//   string() {}

//   maxLength(max: number) {}
// }
