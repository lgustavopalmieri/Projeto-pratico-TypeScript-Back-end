import InvalidUuidError from "../../@seedwork/errors/invalid-uuid.error";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

/*
    This uuid is used looking for flexibility to generate an id
    It can be provided by ORM or this class
*/

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuidv4();
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
