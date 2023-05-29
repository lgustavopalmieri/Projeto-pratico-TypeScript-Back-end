import UniqueEntityId from "./../../@seedwork/domain/value-objects/unique-entity-id.vo";

// abstract prevents this class starts alone
export default abstract class Entity<Props> {
  // This object value allows independent ids
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
