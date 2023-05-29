import UniqueEntityId from "../../@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const entity = new StubEntity(arrange);

    console.log(entity.id);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it("should convert an entity to a Javascript Object", () => {
    const arrange = { prop1: "value1", prop2: 10 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
