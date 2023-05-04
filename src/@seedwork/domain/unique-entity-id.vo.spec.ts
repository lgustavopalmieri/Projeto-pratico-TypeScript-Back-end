import InvalidUuidError from "../../@seedwork/errors/invalid-uuid.error";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "./unique-entity-id.vo";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }

describe("UniqueEntityId Unit Tests", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  // beforeEach(() => validateSpy.mockClear());

  it("should throw an error when uuid is invalid", () => {
    // permite que peguemos um objeto e espie para conseguirmos saber
    // se foi chamado, quantas vezes, quais parâmetros
    //const validateSpy = spyValidateMethod();
    // not called yet
    expect(validateSpy).not.toHaveBeenCalled();

    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid provided in constructor", () => {
    //const validateSpy = spyValidateMethod();
    const uuid = "dd59d065-16f9-4f9e-9c74-e23e36d21e31";

    const valueObject = new UniqueEntityId(uuid);

    expect(valueObject.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid provided in constructor", () => {
    //const validateSpy = spyValidateMethod();

    const valueObject = new UniqueEntityId();

    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
