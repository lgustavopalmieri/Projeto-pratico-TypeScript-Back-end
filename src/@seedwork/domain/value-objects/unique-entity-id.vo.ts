import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object.vo";
import InvalidUuidError from "../errors/invalid-uuid.error";

/*
    This uuid is used looking for flexibility to generate an id
    It can be provided by ORM or this class
*/

/* It extends ValueObject class in order to clarify what is UniqueEntityId */
export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
