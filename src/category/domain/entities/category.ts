import Entity from "../../../@seedwork/domain/entity/entity";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import ValidatorRules from "../../../@seedwork/domain/validators/validator-rules";
import CategoryValidatorFactory from "../validators/category.validator";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export default class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  public update({ name, description }: Partial<CategoryProperties>): void {
    this.props.name = name;
    this.props.description = description;
    Category.validate({
      name,
      description,
    });
  }

  // static validate(props: Omit<CategoryProperties, "id" | "created_at">) {
  //   ValidatorRules.values(props.name, "name")
  //     .required()
  //     .string()
  //     .maxLength(255);
  //   ValidatorRules.values(props.description, "description").string();
  //   ValidatorRules.values(props.is_active, "is_active").boolean();
  // }

  static validate(props: CategoryProperties): void {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }

  get name(): string {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  public activate(): void {
    this.props.is_active = true;
  }

  public deactivate(): void {
    this.props.is_active = false;
  }
}

// TDD - Kent Back
// Tests - Fail - Success - Refactor

// Entidades vs Entidades anêmicas

// Category : uuid id
// Category : string name
// Category : string description
// Category : boolean is_active
// Category : date created_at

// Entidade - conjunto de atributos e objetos de valores e identidade + comportamentos

// Objeto de Valor(Erik Evans):
// Mede, quantifica ou descreve uma coisa no domínio
// Poder ser mantido como imutável
// Ele modela um todo conceitual compondo atributos relacionados como uma unidade integral
// Ele é completamente substituível quando a medição ou descrição muda
// Ele pode ser comparado com outros usando a igualdade de valor
// Ele fornece para comportamento livre de efeitos colaterais
